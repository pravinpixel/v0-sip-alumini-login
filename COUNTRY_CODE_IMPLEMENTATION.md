# Location Selection with Country Code Implementation

## Overview
Enhanced the alumni registration form with radio button option (India / Outside India) above the Email ID field, featuring different OTP verification flows and country code selection for mobile numbers.

## Features Implemented

### 1. Radio Button Selection
- **Location**: Added above Email ID field
- **Options**: 
  - India (default selected)
  - Outside India
- **Styling**: Custom radio buttons with red accent color matching site theme

### 2. Country Code Selection
- **India Selection**: Country code locked to +91 (disabled dropdown)
- **Outside India Selection**: Country code dropdown enabled with 100+ countries
- **Visual Indicators**: Flag emojis and country codes in dropdown
- **Validation**: Different mobile number length validation based on country

### 3. Verification Logic

#### India Selection:
- Email ID collected (no verification required)
- Mobile number with +91 country code (locked)
- Mobile number validation: exactly 10 digits
- Mobile number OTP verification via SMS (existing functionality)
- Form submission requires mobile OTP verification

#### Outside India Selection:
- Email ID collected AND verified via Email OTP
- Mobile number with selectable country code (100+ countries)
- Mobile number validation: 7-15 digits (international standards)
- Mobile number collected (no OTP verification required)
- Form submission requires email OTP verification

### 4. Dynamic UI Changes
- **India Selected**: 
  - Shows mobile verification UI, hides email verification UI
  - Country code locked to +91 and disabled
  - Mobile input placeholder: "Mobile Number (10 digits)"
- **Outside India Selected**: 
  - Shows email verification UI, hides mobile verification UI
  - Country code dropdown enabled with full country list
  - Mobile input placeholder: "Mobile Number"
- Smooth transitions between verification modes
- Proper state management when switching between options

### 5. Mobile Number Formatting & Validation
- **India**: Exactly 10 digits required
- **Outside India**: 7-15 digits allowed (international standards)
- **Real-time formatting**: Numbers-only input with length limits
- **Country code integration**: Full mobile number = country code + number
- **API Integration**: Full mobile number (with country code) sent to OTP APIs

### 6. Enhanced Country Code Dropdown
- **100+ Countries**: Comprehensive list of international country codes
- **Visual Design**: Flag emojis + country codes for easy identification
- **Popular Countries**: Commonly used countries listed first
- **Responsive**: Adapts to mobile devices with stacked layout

## Files Modified

### 1. `index.html`
- Added comprehensive country code dropdown with 100+ countries
- Enhanced mobile input container with country code selector
- Updated JavaScript for country code handling and validation
- Modified form submission to include country code in payload
- Updated mobile OTP verification to use full mobile number (country code + number)

### 2. `style.css`
- Added country code selector styling
- Enhanced mobile input container layout (side-by-side on desktop, stacked on mobile)
- Added India/Outside India mode styling for country code dropdown
- Responsive design for mobile devices
- Visual states for disabled/enabled country code selector

### 3. `test-country-code.html` (New)
- Comprehensive test page demonstrating country code functionality
- Interactive testing with simulated OTP verification
- Visual feedback for country code changes and validation
- Form submission testing with country code integration

## Country Code Features

### Supported Countries (100+):
- **Asia**: India, China, Japan, South Korea, Singapore, Malaysia, Thailand, etc.
- **Europe**: UK, Germany, France, Italy, Spain, Netherlands, etc.
- **North America**: USA, Canada, Mexico
- **Middle East**: UAE, Saudi Arabia, Qatar, Kuwait, etc.
- **Africa**: South Africa, Nigeria, Kenya, Egypt, etc.
- **Oceania**: Australia, New Zealand
- **South America**: Brazil, Argentina, Chile, etc.

### Country Code Behavior:
1. **India Mode**: 
   - Dropdown disabled and grayed out
   - Locked to +91
   - 10-digit validation
   - Mobile OTP required

2. **Outside India Mode**:
   - Dropdown enabled with full country list
   - User can select any country
   - 7-15 digit validation (international standard)
   - Email OTP required, mobile collected but not verified

## API Integration

### Mobile OTP (Updated):
- **Endpoint**: `https://sip-admin.designonline.in/api/send-otp`
- **Parameter**: `mobile_number` now includes country code (e.g., "+919876543210")
- **Verification**: `https://sip-admin.designonline.in/api/verify-otp`

### Email OTP (Ready for Integration):
- **Send**: `https://sip-admin.designonline.in/api/send-email-otp`
- **Verify**: `https://sip-admin.designonline.in/api/verify-email-otp`
- **Current**: Simulated for testing (use OTP: 123456)

### Form Submission (Updated):
- **Endpoint**: `https://sip-admin.designonline.in/api/register`
- **New Fields**:
  - `location`: "india" or "outside"
  - `country_code`: Selected country code (e.g., "+91", "+1", "+44")
  - `mobile_number`: Mobile number without country code
  - Full mobile number sent to OTP APIs as country_code + mobile_number

## User Experience Enhancements

### 1. Smart Defaults:
- India selected by default
- Country code defaults to +91
- Appropriate placeholders based on selection

### 2. Visual Feedback:
- Country code dropdown changes appearance based on mode
- Clear indication when country code is locked vs selectable
- Flag emojis for easy country identification

### 3. Validation Messages:
- Location-specific validation messages
- Clear error messages for mobile number length
- Different requirements clearly communicated

### 4. Responsive Design:
- Desktop: Country code and mobile number side-by-side
- Mobile: Stacked layout for better usability
- Consistent styling across all devices

## Testing

### Test Page Usage (`test-country-code.html`):
1. Open the test page in browser
2. Switch between India/Outside India options
3. Observe country code dropdown behavior
4. Test mobile number validation with different countries
5. Use OTP: `123456` for both email and mobile verification
6. Submit form to see complete data structure

### Manual Testing Checklist:
- [ ] Radio button selection changes UI correctly
- [ ] Country code locked for India, selectable for Outside India
- [ ] Mobile number validation works for different countries
- [ ] Email OTP flow (simulated) functions properly
- [ ] Mobile OTP flow works with country codes
- [ ] Form submission includes country code
- [ ] Responsive design on mobile devices
- [ ] Error handling and user feedback

## Production Deployment

### Before Going Live:
1. **Email OTP API**: Implement actual email OTP endpoints
2. **Mobile OTP Testing**: Test with international mobile numbers
3. **Country Code Validation**: Verify country codes work with SMS provider
4. **Database Schema**: Ensure backend can handle country codes
5. **Error Handling**: Test edge cases with various country codes

### Configuration Options:
- Country code list can be customized/filtered as needed
- Mobile number length validation can be adjusted per country
- Default country can be changed based on user location detection
- Additional countries can be added to the dropdown list

## Future Enhancements

### Potential Improvements:
1. **Auto-detection**: Detect user's country and pre-select country code
2. **Popular Countries**: Show frequently used countries at the top
3. **Search Functionality**: Add search/filter to country dropdown
4. **Validation Rules**: Country-specific mobile number format validation
5. **Carrier Detection**: Identify mobile carrier for better OTP delivery
6. **International SMS**: Optimize SMS delivery for different countries

This implementation provides a comprehensive solution for international user registration while maintaining the existing India-focused workflow.