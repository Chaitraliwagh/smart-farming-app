# 🧪 Testing Guide

## Complete Testing Checklist

### ✅ Pre-Testing Setup
- [ ] All services running (MongoDB, Backend, ML Service, Frontend)
- [ ] .env files configured with API keys
- [ ] Browser console open (F12) for debugging
- [ ] Network tab open to monitor API calls

---

## 1. 🏠 Home Page Testing

### Test Cases:
1. **Page Load**
   - [ ] Page loads without errors
   - [ ] All feature cards visible
   - [ ] Images load properly
   - [ ] Stats display correctly (95%, 50+, 30+, 3)

2. **Navigation**
   - [ ] Clicking feature cards navigates to correct tab
   - [ ] All tab buttons work
   - [ ] Active tab is highlighted

3. **Language Switching**
   - [ ] Dropdown shows all 3 languages
   - [ ] Switching to Hindi changes all text
   - [ ] Switching to Marathi changes all text
   - [ ] Switching back to English works

**Expected Results:**
- No console errors
- Smooth navigation
- All translations work correctly

---

## 2. 🦠 Disease Detection Testing

### Test Case 1: Upload Valid Image
**Steps:**
1. Click "Disease Detection" tab
2. Click "Select Image"
3. Choose an image file (JPG/PNG)
4. Verify preview appears
5. Click "Analyze"
6. Wait for results

**Expected Results:**
- Image preview displays
- Loading indicator shows
- Results appear within 3-5 seconds
- Shows: Disease name, confidence %, cause, treatment
- No errors in console

### Test Case 2: Upload Multiple Times
**Steps:**
1. Upload image → Analyze
2. Click "Reset"
3. Upload different image → Analyze
4. Repeat 3-4 times

**Expected Results:**
- Results clear on reset
- Each analysis completes successfully
- No memory leaks
- Consistent response times

### Test Case 3: Error Handling
**Steps:**
1. Try uploading without selecting image
2. Try uploading very large file (>5MB)
3. Try uploading non-image file (.pdf, .txt)

**Expected Results:**
- Appropriate error messages display
- No crashes
- User can recover and try again

### Test Case 4: ML Service Down
**Steps:**
1. Stop Python Flask service
2. Try to analyze image

**Expected Results:**
- Error message: "ML service is not available"
- User-friendly error display
- Suggestion to check service

**Sample Test Images:**
- Green leaf (should detect as healthy)
- Brown-spotted leaf (should detect disease)
- Yellow leaf (should detect disease)

---

## 3. 🌱 Fertilizer Recommendation Testing

### Test Case 1: Balanced Soil (Happy Path)
**Input:**
```
N: 40
P: 45
K: 50
pH: 6.5
Crop: Rice
```

**Expected Output:**
- Fertilizer: NPK (19-19-19) or Organic Compost
- Quantity: 100-150 kg per acre
- Application method provided
- Additional notes about soil pH

### Test Case 2: Nitrogen Deficient
**Input:**
```
N: 15
P: 45
K: 50
pH: 6.5
Crop: Wheat
```

**Expected Output:**
- Fertilizer: Urea (46-0-0)
- Specific nitrogen recommendations
- Application timing guidance

### Test Case 3: Phosphorus Deficient
**Input:**
```
N: 40
P: 20
K: 50
pH: 6.5
Crop: Corn
```

**Expected Output:**
- Fertilizer: DAP (18-46-0)
- Phosphorus-specific recommendations

### Test Case 4: Potassium Deficient
**Input:**
```
N: 40
P: 45
K: 15
pH: 6.5
Crop: Potato
```

**Expected Output:**
- Fertilizer: MOP (0-0-60)
- Potassium application guidance

### Test Case 5: Extreme pH Values
**Input 1:** pH: 4.5 (acidic)
**Input 2:** pH: 8.5 (alkaline)

**Expected Output:**
- Recommendations include pH adjustment advice
- Lime for acidic soil
- Sulfur for alkaline soil

### Test Case 6: Invalid Inputs
**Test:**
- Empty fields
- Negative values
- Values out of range (N > 100, pH > 9)

**Expected Results:**
- Validation error messages
- Fields highlighted in red
- Specific error descriptions

---

## 4. 🌦️ Weather Forecast Testing

### Test Case 1: Default City (Pune)
**Steps:**
1. Navigate to Weather Forecast tab
2. Wait for data to load

**Expected Results:**
- Current weather displays
- Temperature, humidity, wind speed shown
- 5-day forecast cards appear
- Weather icons appropriate to conditions

### Test Case 2: Search Different Cities
**Test Cities:**
1. Mumbai
2. Delhi
3. Bangalore
4. Kolkata
5. Invalid city (e.g., "XYZ123")

**Expected Results:**
- Valid cities load correctly
- Invalid city shows error message
- Error is user-friendly
- Can search again after error

### Test Case 3: API Key Issues
**Steps:**
1. Use invalid API key in .env
2. Try to load weather

**Expected Results:**
- Error message about invalid API key
- Instructions to check .env file
- No crash

### Test Case 4: No Internet
**Steps:**
1. Disconnect internet
2. Try to fetch weather

**Expected Results:**
- Network error message
- Suggestion to check connection
- Can retry when back online

---

## 5. 🌾 Crop Recommendation Testing

### Test Case 1: Optimal Conditions for Rice
**Input:**
```
N: 90, P: 42, K: 43
Temperature: 25°C
Humidity: 80%
pH: 6.5
Rainfall: 200mm
```

**Expected Output:**
- Rice appears in top 3
- Suitability score > 80%
- Season: Kharif
- Expected yield displayed

### Test Case 2: Wheat-Favorable Conditions
**Input:**
```
N: 85, P: 45, K: 40
Temperature: 20°C
Humidity: 65%
pH: 7.0
Rainfall: 60mm
```

**Expected Output:**
- Wheat appears in top 3
- High suitability score
- Season: Rabi

### Test Case 3: Multiple Suitable Crops
**Input:**
```
N: 50, P: 50, K: 50
Temperature: 25°C
Humidity: 70%
pH: 6.5
Rainfall: 100mm
```

**Expected Output:**
- Exactly 3 recommendations
- Sorted by suitability score
- Different crops suggested
- Each with yield and season info

### Test Case 4: Extreme Conditions
**Test 1 - Very Hot:**
```
Temperature: 45°C
```

**Test 2 - Very Cold:**
```
Temperature: 5°C
```

**Expected Results:**
- Still provides recommendations
- Lower suitability scores
- Appropriate warnings if needed

### Test Case 5: Poor Soil
**Input:**
```
N: 10, P: 10, K: 10
pH: 4.0
```

**Expected Results:**
- Recommendations still provided
- Lower suitability scores
- Might suggest soil improvement

---

## 6. 🌍 Multilingual Testing

### Test All Features in Each Language

**English → Hindi:**
1. Test all 5 features
2. Verify all labels translate
3. Check form placeholders
4. Verify error messages

**Hindi → Marathi:**
1. Repeat all tests
2. Ensure complete translation
3. Check for missing translations

**Marathi → English:**
1. Return to English
2. Verify everything still works
3. No translation artifacts

**Test Points:**
- [ ] Navigation tabs
- [ ] Form labels
- [ ] Button text
- [ ] Error messages
- [ ] Result displays
- [ ] Placeholders
- [ ] Help text

---

## 7. 🔄 Cross-Browser Testing

### Browsers to Test:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (if on Mac)
- [ ] Edge (latest)

### Test Each Browser:
1. All features work
2. Styling appears correct
3. File upload works
4. API calls succeed
5. No console errors

---

## 8. 📱 Mobile Responsiveness Testing

### Devices/Sizes:
- [ ] Mobile (375px)
- [ ] Tablet (768px)
- [ ] Desktop (1920px)

### Test Points:
- [ ] Navigation accessible
- [ ] Forms usable
- [ ] Images scale properly
- [ ] Text readable
- [ ] Buttons touchable
- [ ] No horizontal scroll

**Testing Method:**
1. Open browser DevTools (F12)
2. Toggle device toolbar
3. Test different screen sizes
4. Check both portrait and landscape

---

## 9. ⚡ Performance Testing

### Load Time Tests:
1. **Initial Load**
   - Should complete < 3 seconds
   - Check Network tab for slow resources

2. **Image Upload**
   - Should process < 5 seconds
   - Check file size impact

3. **API Responses**
   - Disease detection: < 5 seconds
   - Fertilizer: < 2 seconds
   - Weather: < 3 seconds
   - Crop: < 2 seconds

### Stress Testing:
1. Upload 10 images rapidly
2. Switch languages repeatedly
3. Submit multiple forms quickly

**Expected Results:**
- No crashes
- Reasonable response times
- No memory leaks
- Proper error handling

---

## 10. 🔒 Security Testing

### Input Validation:
- [ ] SQL injection attempts fail
- [ ] XSS attempts sanitized
- [ ] Large files rejected
- [ ] Invalid file types rejected
- [ ] Malformed JSON handled

### API Security:
- [ ] CORS properly configured
- [ ] No sensitive data in URLs
- [ ] API keys not exposed in frontend
- [ ] Error messages don't leak info

---

## 11. 🐛 Error Recovery Testing

### Backend Down:
1. Stop backend server
2. Try each feature
3. Verify error messages
4. Restart backend
5. Verify recovery

### ML Service Down:
1. Stop Flask service
2. Try disease detection
3. Verify appropriate error
4. Restart service
5. Verify immediate recovery

### Network Issues:
1. Disconnect internet
2. Try weather feature
3. Verify error handling
4. Reconnect
5. Verify retry works

---

## 12. 📊 End-to-End User Journey

### Complete Farmer Workflow:

**Scenario:** Farmer wants to plant new crop

1. **Check Weather**
   - [ ] View current conditions
   - [ ] Check 5-day forecast
   - [ ] Note temperature & rainfall

2. **Test Soil**
   - [ ] Enter soil NPK values
   - [ ] Get fertilizer recommendation
   - [ ] Note requirements

3. **Get Crop Advice**
   - [ ] Enter all parameters
   - [ ] Review recommendations
   - [ ] Note top 3 crops

4. **Check Plant Health**
   - [ ] Upload leaf image
   - [ ] Review disease status
   - [ ] Note any treatments needed

5. **Switch Language**
   - [ ] Change to Hindi/Marathi
   - [ ] Verify understanding
   - [ ] Complete workflow in local language

**Expected Time:** 5-10 minutes
**Expected Experience:** Smooth, no confusion, clear results

---

## 📝 Bug Report Template

When you find a bug, document it:

```
🐛 Bug Title: [Short description]

📍 Location: [Component/Feature]

🔢 Steps to Reproduce:
1. 
2. 
3. 

❌ Expected Result:


✅ Actual Result:


🖥️ Environment:
- Browser: 
- OS: 
- Screen Size: 

📸 Screenshot: [if applicable]

🔍 Console Errors: [if any]

⚠️ Severity: [Low/Medium/High/Critical]
```

---

## ✅ Testing Checklist Summary

Before considering the app "tested":

- [ ] All 5 main features work
- [ ] 3 languages fully functional
- [ ] All test cases pass
- [ ] Mobile responsive
- [ ] Cross-browser compatible
- [ ] Performance acceptable
- [ ] Error handling robust
- [ ] Security validated
- [ ] End-to-end workflow smooth
- [ ] Documentation clear

---

## 🎯 Success Criteria

The application is ready for use when:

1. ✅ All core features work reliably
2. ✅ No critical bugs found
3. ✅ Performance meets targets
4. ✅ Works on all major browsers
5. ✅ Mobile-friendly
6. ✅ Multilingual support complete
7. ✅ Error messages helpful
8. ✅ Recovery from errors possible
9. ✅ User experience smooth
10. ✅ Documentation complete

---

## 💡 Testing Tips

1. **Test in order:** Start with simpler features, progress to complex
2. **Document everything:** Keep notes of all issues
3. **Retest fixes:** After fixing bugs, retest that feature
4. **Think like a user:** What would a farmer do?
5. **Test edge cases:** Don't just test happy paths
6. **Use real data:** Test with realistic values
7. **Be systematic:** Follow checklist, don't skip steps
8. **Test integrations:** Ensure features work together
9. **Check logs:** Monitor console and server logs
10. **Get feedback:** Have others test if possible

---

**Remember:** Good testing ensures farmers can rely on this application for their critical agricultural decisions! 🌾
