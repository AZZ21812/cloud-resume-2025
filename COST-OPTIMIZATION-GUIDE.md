# AWS Cost Optimization & Monitoring Guide

## 💰 Cost Breakdown for 10,000 Visitors/Month

### Total Estimated Cost: **$7.08/month**

| Service | Cost | Percentage |
|---------|------|------------|
| CloudFront (CDN) | $0.87 | 12.3% |
| S3 Storage | $0.00 | 0.0% |
| Lambda Functions | $0.00 | 0.0% (Free Tier) |
| DynamoDB | $0.02 | 0.3% |
| **Bedrock (AI Chatbot)** | **$6.19** | **87.4%** |
| **TOTAL** | **$7.08** | **100%** |

### 🎯 Key Insight:
**The AI chatbot (Bedrock) accounts for 87% of costs!**

---

## 📊 Detailed Cost Calculations

### CloudFront (CDN) - $0.87/month
```
Data Transfer:
- 10,000 visitors × 900 KB = 9 GB
- $0.085 per GB = $0.77

HTTPS Requests:
- 100,000 requests
- $0.01 per 10,000 = $0.10

Total: $0.87
```

### S3 - $0.004/month
```
Storage: 1 MB × $0.023/GB = ~$0.00
Requests: 10,000 × $0.0004/1000 = $0.004
```

### Lambda Functions - FREE
```
Counter Function:
- 10,000 invocations (FREE - under 1M)
- 128,000 MB-seconds (FREE - under 400K GB-seconds)

Chatbot Function:
- 15,000 invocations (FREE - under 1M)
- 30,720,000 MB-seconds (FREE - under 400K GB-seconds)

Both are FREE within AWS Free Tier!
```

### DynamoDB - $0.015/month
```
Writes: 10,000 × $0.00000125 = $0.0125
Reads: 10,000 × $0.00000025 = $0.0025
Storage: FREE (under 25 GB)
```

### Amazon Bedrock (Claude 3 Haiku) - $6.19/month
```
Assumptions:
- 5,000 visitors use chatbot (50%)
- 3 messages per conversation = 15,000 messages
- 150 input tokens + 300 output tokens per message

Input Tokens:
- 15,000 × 150 = 2,250,000 tokens
- $0.25 per 1M = $0.56

Output Tokens:
- 15,000 × 300 = 4,500,000 tokens
- $1.25 per 1M = $5.63

Total: $6.19
```

---

## 🚨 Billing Alarms Setup

### ✅ Alarms Created:

1. **$10 Warning Alarm**
   - Triggers when bill exceeds $10
   - Early warning for normal usage

2. **$20 Alert Alarm**
   - Triggers when bill exceeds $20
   - Indicates higher than expected traffic

3. **$50 EMERGENCY Alarm**
   - Triggers when bill exceeds $50
   - Possible abuse or attack

### Subscribe to Alerts:

Run this command with **your email**:
```bash
aws sns subscribe \
  --topic-arn arn:aws:sns:us-east-1:600592587584:BillingAlerts \
  --protocol email \
  --notification-endpoint YOUR_EMAIL@example.com \
  --region us-east-1
```

You'll receive a confirmation email - click the link to activate alerts.

---

## 💡 Cost Optimization Strategies

### 1. **Reduce Chatbot Costs** (Biggest Impact!)

**Option A: Add Rate Limiting**
```javascript
// In Chatbot.tsx - limit messages per user
const MAX_MESSAGES_PER_SESSION = 5;
const [messageCount, setMessageCount] = useState(0);

if (messageCount >= MAX_MESSAGES_PER_SESSION) {
  alert('You have reached the maximum number of messages for this session.');
  return;
}
```

**Savings:** 50% reduction = **$3.10/month saved**

**Option B: Use Cheaper Model**
- Switch from Claude 3 Haiku to a cheaper alternative
- Or reduce max_tokens in responses

**Option C: Add Caching**
- Cache common questions/answers
- Only call Bedrock for new questions

**Option D: Remove Chatbot** (if not essential)
**Savings:** $6.19/month (reduces total to $0.89/month!)

### 2. **Optimize CloudFront Caching**

**Current Setup:** Default caching
**Improved Setup:** Longer cache times

```javascript
// In CloudFront distribution settings:
MinTTL: 86400 (1 day)
MaxTTL: 31536000 (1 year)
DefaultTTL: 86400 (1 day)
```

**Savings:** ~20% reduction = **$0.17/month saved**

### 3. **Enable Gzip Compression**

CloudFront already compresses, but ensure all text files are compressed:
**Savings:** ~10% data transfer = **$0.08/month saved**

### 4. **Monitor DynamoDB Usage**

For higher traffic, consider:
- On-Demand pricing (current) vs Provisioned capacity
- Enable Auto Scaling for predictable costs

---

## 📈 Cost Scaling Projections

| Monthly Visitors | CloudFront | DynamoDB | Bedrock | **Total** |
|------------------|------------|----------|---------|-----------|
| 1,000 | $0.09 | $0.002 | $0.62 | **$0.71** |
| 10,000 | $0.87 | $0.02 | $6.19 | **$7.08** |
| 50,000 | $4.35 | $0.08 | $30.95 | **$35.38** |
| 100,000 | $8.70 | $0.15 | $61.90 | **$70.75** |

### 🎯 Key Takeaway:
Bedrock costs scale linearly with chatbot usage!

---

## 🔍 Monitoring Your Costs

### AWS Cost Explorer

1. Go to: https://console.aws.amazon.com/cost-management/home
2. View your costs by service
3. Set up Cost Anomaly Detection

### Check Current Month Costs:

```bash
# Get current month billing
aws ce get-cost-and-usage \
  --time-period Start=2025-11-01,End=2025-12-01 \
  --granularity MONTHLY \
  --metrics UnblendedCost \
  --region us-east-1
```

### CloudWatch Billing Dashboard

View real-time costs:
1. CloudWatch Console → Billing
2. View EstimatedCharges metric
3. Create custom dashboard

---

## 🛡️ Protection Against Cost Overruns

### 1. **AWS Budget**

Set up a budget for automatic alerts:

```bash
# Create a $20/month budget
aws budgets create-budget \
  --account-id YOUR_ACCOUNT_ID \
  --budget file://budget.json \
  --region us-east-1
```

### 2. **Lambda Concurrent Execution Limits**

Attempted to set, but account needs minimum 10 unreserved executions.

**Manual limit:** Monitor Lambda invocation metrics in CloudWatch.

### 3. **API Gateway Rate Limiting** (Future Enhancement)

If you add API Gateway:
- Set throttling limits (e.g., 100 requests/second)
- Prevents abuse

### 4. **CloudFront Request Limits**

Monitor unusual traffic patterns:
- 10,000 visitors should generate ~100,000 requests
- If you see millions of requests, investigate!

---

## 💸 Ways to Reduce Costs Further

### Free Tier Benefits (First 12 Months)

AWS Free Tier includes:
- **Lambda:** 1M requests/month FREE
- **DynamoDB:** 25 GB storage, 200M requests FREE
- **CloudFront:** 1 TB data transfer, 10M HTTPS requests FREE
- **S3:** 5 GB storage, 20,000 GET requests FREE

**Result:** First year is essentially FREE (except Bedrock)!

### After Free Tier Expires

**Option 1: Stay Serverless**
- Costs remain very low
- Pay only for actual usage

**Option 2: Switch AI Provider**
- Use OpenAI's cheaper models
- Or remove chatbot entirely

**Option 3: Add Caching Layer**
- Redis/ElastiCache for API responses
- Reduce Lambda invocations

---

## 🎯 Recommended Actions

### Immediate (Do Now):
1. ✅ Billing alarms created ($10, $20, $50)
2. ⏳ Subscribe to SNS alerts with your email
3. ✅ CloudFront deployed (HTTPS + caching)
4. ⏳ Monitor costs weekly in AWS Console

### Short-term (This Month):
1. Add chatbot rate limiting (5 messages/session)
2. Enable CloudWatch Logs Insights for Lambda
3. Review Cost Explorer weekly
4. Test with load to estimate real costs

### Long-term (Next 3 Months):
1. Analyze which features users actually use
2. Consider removing chatbot if unused (87% cost savings!)
3. Optimize DynamoDB queries
4. Add custom domain with Route 53

---

## 📞 Emergency Cost Response

### If Bill Exceeds $50:

1. **Immediately disable Bedrock**
   ```bash
   # Remove Bedrock permissions from Lambda
   aws lambda update-function-configuration \
     --function-name ChatbotFunction \
     --environment Variables={DISABLE_CHATBOT=true}
   ```

2. **Check CloudWatch Logs**
   - Look for unusual traffic patterns
   - Check for API abuse

3. **Disable Lambda Function URLs**
   ```bash
   # Temporarily disable public access
   aws lambda delete-function-url-config \
     --function-name ChatbotFunction
   ```

4. **Contact AWS Support**
   - Request cost review
   - Ask about AWS Credits for startups

---

## 📋 Monthly Cost Checklist

**Week 1:**
- [ ] Check AWS Cost Explorer
- [ ] Review CloudWatch metrics
- [ ] Verify billing alarms working

**Week 2:**
- [ ] Analyze traffic patterns
- [ ] Check for unusual spikes
- [ ] Review Bedrock usage

**Week 3:**
- [ ] Compare costs to projections
- [ ] Optimize if needed
- [ ] Test new features in dev first

**Week 4:**
- [ ] Monthly cost report
- [ ] Plan next month's budget
- [ ] Implement optimizations

---

## 🎓 Learning Resources

**AWS Cost Optimization:**
- [AWS Cost Management Console](https://console.aws.amazon.com/cost-management/)
- [AWS Well-Architected Cost Optimization](https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html)
- [AWS Free Tier](https://aws.amazon.com/free/)

**Bedrock Pricing:**
- [Amazon Bedrock Pricing](https://aws.amazon.com/bedrock/pricing/)
- [Claude Model Pricing](https://www.anthropic.com/api)

---

## 📊 Summary

### Current Setup:
- ✅ **Estimated cost:** $7.08/month for 10,000 visitors
- ✅ **Billing alarms:** Set at $10, $20, $50
- ✅ **Free tier:** Covers Lambda, DynamoDB (first year)
- ✅ **Biggest cost:** Bedrock AI chatbot (87%)

### Recommendations:
1. **Subscribe to billing alerts** (use your email)
2. **Add chatbot rate limiting** (save 50%)
3. **Monitor weekly** (AWS Cost Explorer)
4. **Consider removing chatbot** if unused (save $6.19/month)

### Best Case Scenario:
- With free tier + no chatbot usage: **~$0.90/month**
- With optimizations: **~$3-4/month**
- Current projection: **$7.08/month**

**Your site is very cost-effective for a portfolio project!** 🎉
