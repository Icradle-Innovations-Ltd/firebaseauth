'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { RecaptchaVerifier, ConfirmationResult } from 'firebase/auth';
import { auth } from '@/lib/firebase';

// Extend the Window interface
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier | undefined;
  }
}

export default function PhoneLogin() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+256');
  const [searchTerm, setSearchTerm] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const { signInWithPhone, confirmPhoneSignIn } = useAuth();
  const router = useRouter();

  // Comprehensive country codes list
  const countryCodes = [
    // Popular countries first
    { code: '+1', country: 'United States', flag: '🇺🇸' },
    { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+55', country: 'Brazil', flag: '🇧🇷' },
    
    // African countries (including Uganda)
    { code: '+256', country: 'Uganda', flag: '🇺🇬' },
    { code: '+254', country: 'Kenya', flag: '🇰🇪' },
    { code: '+255', country: 'Tanzania', flag: '🇹🇿' },
    { code: '+250', country: 'Rwanda', flag: '🇷🇼' },
    { code: '+257', country: 'Burundi', flag: '🇧🇮' },
    { code: '+251', country: 'Ethiopia', flag: '🇪🇹' },
    { code: '+252', country: 'Somalia', flag: '🇸🇴' },
    { code: '+253', country: 'Djibouti', flag: '🇩🇯' },
    { code: '+211', country: 'South Sudan', flag: '🇸🇸' },
    { code: '+249', country: 'Sudan', flag: '🇸🇩' },
    { code: '+20', country: 'Egypt', flag: '🇪🇬' },
    { code: '+218', country: 'Libya', flag: '🇱🇾' },
    { code: '+216', country: 'Tunisia', flag: '🇹🇳' },
    { code: '+213', country: 'Algeria', flag: '🇩🇿' },
    { code: '+212', country: 'Morocco', flag: '🇲🇦' },
    { code: '+27', country: 'South Africa', flag: '🇿🇦' },
    { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
    { code: '+233', country: 'Ghana', flag: '🇬🇭' },
    { code: '+225', country: 'Ivory Coast', flag: '🇨🇮' },
    { code: '+221', country: 'Senegal', flag: '🇸🇳' },
    { code: '+220', country: 'Gambia', flag: '🇬🇲' },
    { code: '+224', country: 'Guinea', flag: '🇬🇳' },
    { code: '+232', country: 'Sierra Leone', flag: '🇸🇱' },
    { code: '+231', country: 'Liberia', flag: '🇱🇷' },
    { code: '+237', country: 'Cameroon', flag: '🇨🇲' },
    { code: '+240', country: 'Equatorial Guinea', flag: '🇬🇶' },
    { code: '+241', country: 'Gabon', flag: '🇬🇦' },
    { code: '+242', country: 'Congo', flag: '🇨🇬' },
    { code: '+243', country: 'Congo (DRC)', flag: '🇨🇩' },
    { code: '+236', country: 'Central African Republic', flag: '🇨🇫' },
    { code: '+235', country: 'Chad', flag: '🇹🇩' },
    { code: '+244', country: 'Angola', flag: '🇦🇴' },
    { code: '+260', country: 'Zambia', flag: '🇿🇲' },
    { code: '+263', country: 'Zimbabwe', flag: '🇿🇼' },
    { code: '+267', country: 'Botswana', flag: '🇧🇼' },
    { code: '+264', country: 'Namibia', flag: '🇳🇦' },
    { code: '+266', country: 'Lesotho', flag: '🇱🇸' },
    { code: '+268', country: 'Eswatini', flag: '🇸🇿' },
    { code: '+258', country: 'Mozambique', flag: '🇲🇿' },
    { code: '+265', country: 'Malawi', flag: '🇲🇼' },
    { code: '+261', country: 'Madagascar', flag: '🇲🇬' },
    { code: '+230', country: 'Mauritius', flag: '🇲🇺' },
    { code: '+248', country: 'Seychelles', flag: '🇸🇨' },
    { code: '+269', country: 'Comoros', flag: '🇰🇲' },
    { code: '+229', country: 'Benin', flag: '🇧🇯' },
    { code: '+228', country: 'Togo', flag: '🇹🇬' },
    { code: '+226', country: 'Burkina Faso', flag: '🇧🇫' },
    { code: '+223', country: 'Mali', flag: '🇲🇱' },
    { code: '+227', country: 'Niger', flag: '🇳🇪' },
    { code: '+222', country: 'Mauritania', flag: '🇲🇷' },
    { code: '+238', country: 'Cape Verde', flag: '🇨🇻' },
    { code: '+245', country: 'Guinea-Bissau', flag: '🇬🇼' },
    { code: '+239', country: 'São Tomé and Príncipe', flag: '🇸🇹' },
    { code: '+291', country: 'Eritrea', flag: '🇪🇷' },
    
    // European countries
    { code: '+39', country: 'Italy', flag: '🇮🇹' },
    { code: '+34', country: 'Spain', flag: '🇪🇸' },
    { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
    { code: '+32', country: 'Belgium', flag: '🇧🇪' },
    { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
    { code: '+43', country: 'Austria', flag: '🇦🇹' },
    { code: '+45', country: 'Denmark', flag: '🇩🇰' },
    { code: '+46', country: 'Sweden', flag: '🇸🇪' },
    { code: '+47', country: 'Norway', flag: '🇳🇴' },
    { code: '+48', country: 'Poland', flag: '🇵🇱' },
    { code: '+351', country: 'Portugal', flag: '🇵🇹' },
    { code: '+30', country: 'Greece', flag: '🇬🇷' },
    { code: '+90', country: 'Turkey', flag: '🇹🇷' },
    { code: '+420', country: 'Czech Republic', flag: '🇨🇿' },
    { code: '+36', country: 'Hungary', flag: '🇭🇺' },
    { code: '+40', country: 'Romania', flag: '🇷🇴' },
    { code: '+359', country: 'Bulgaria', flag: '🇧🇬' },
    { code: '+385', country: 'Croatia', flag: '🇭🇷' },
    { code: '+381', country: 'Serbia', flag: '🇷🇸' },
    { code: '+387', country: 'Bosnia and Herzegovina', flag: '🇧🇦' },
    { code: '+382', country: 'Montenegro', flag: '🇲🇪' },
    { code: '+386', country: 'Slovenia', flag: '🇸🇮' },
    { code: '+421', country: 'Slovakia', flag: '🇸🇰' },
    { code: '+389', country: 'North Macedonia', flag: '🇲🇰' },
    { code: '+355', country: 'Albania', flag: '🇦🇱' },
    { code: '+7', country: 'Russia', flag: '🇷🇺' },
    { code: '+380', country: 'Ukraine', flag: '🇺🇦' },
    { code: '+375', country: 'Belarus', flag: '🇧🇾' },
    { code: '+370', country: 'Lithuania', flag: '🇱🇹' },
    { code: '+371', country: 'Latvia', flag: '🇱🇻' },
    { code: '+372', country: 'Estonia', flag: '🇪🇪' },
    { code: '+358', country: 'Finland', flag: '🇫🇮' },
    { code: '+354', country: 'Iceland', flag: '🇮🇸' },
    { code: '+353', country: 'Ireland', flag: '🇮🇪' },
    
    // Asian countries
    { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
    { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
    { code: '+65', country: 'Singapore', flag: '🇸🇬' },
    { code: '+66', country: 'Thailand', flag: '🇹🇭' },
    { code: '+84', country: 'Vietnam', flag: '🇻🇳' },
    { code: '+63', country: 'Philippines', flag: '🇵🇭' },
    { code: '+82', country: 'South Korea', flag: '🇰🇷' },
    { code: '+92', country: 'Pakistan', flag: '🇵🇰' },
    { code: '+880', country: 'Bangladesh', flag: '🇧🇩' },
    { code: '+94', country: 'Sri Lanka', flag: '🇱🇰' },
    { code: '+977', country: 'Nepal', flag: '🇳🇵' },
    { code: '+975', country: 'Bhutan', flag: '🇧🇹' },
    { code: '+960', country: 'Maldives', flag: '🇲🇻' },
    { code: '+93', country: 'Afghanistan', flag: '🇦🇫' },
    { code: '+98', country: 'Iran', flag: '🇮🇷' },
    { code: '+964', country: 'Iraq', flag: '🇮🇶' },
    { code: '+961', country: 'Lebanon', flag: '🇱🇧' },
    { code: '+962', country: 'Jordan', flag: '🇯🇴' },
    { code: '+963', country: 'Syria', flag: '🇸🇾' },
    { code: '+972', country: 'Israel', flag: '🇮🇱' },
    { code: '+970', country: 'Palestine', flag: '🇵🇸' },
    { code: '+973', country: 'Bahrain', flag: '🇧🇭' },
    { code: '+974', country: 'Qatar', flag: '🇶🇦' },
    { code: '+971', country: 'United Arab Emirates', flag: '🇦🇪' },
    { code: '+968', country: 'Oman', flag: '🇴🇲' },
    { code: '+965', country: 'Kuwait', flag: '🇰🇼' },
    { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+967', country: 'Yemen', flag: '🇾🇪' },
    { code: '+374', country: 'Armenia', flag: '🇦🇲' },
    { code: '+994', country: 'Azerbaijan', flag: '🇦🇿' },
    { code: '+995', country: 'Georgia', flag: '🇬🇪' },
    { code: '+7', country: 'Kazakhstan', flag: '🇰🇿' },
    { code: '+996', country: 'Kyrgyzstan', flag: '🇰🇬' },
    { code: '+992', country: 'Tajikistan', flag: '🇹🇯' },
    { code: '+993', country: 'Turkmenistan', flag: '🇹🇲' },
    { code: '+998', country: 'Uzbekistan', flag: '🇺🇿' },
    { code: '+976', country: 'Mongolia', flag: '🇲🇳' },
    { code: '+95', country: 'Myanmar', flag: '🇲🇲' },
    { code: '+856', country: 'Laos', flag: '🇱🇦' },
    { code: '+855', country: 'Cambodia', flag: '🇰🇭' },
    { code: '+673', country: 'Brunei', flag: '🇧🇳' },
    { code: '+670', country: 'Timor-Leste', flag: '🇹🇱' },
    { code: '+886', country: 'Taiwan', flag: '🇹🇼' },
    { code: '+852', country: 'Hong Kong', flag: '🇭🇰' },
    { code: '+853', country: 'Macau', flag: '🇲🇴' },
    { code: '+850', country: 'North Korea', flag: '🇰🇵' },
    
    // Americas
    { code: '+1', country: 'Canada', flag: '🇨🇦' },
    { code: '+52', country: 'Mexico', flag: '🇲🇽' },
    { code: '+54', country: 'Argentina', flag: '🇦🇷' },
    { code: '+56', country: 'Chile', flag: '🇨🇱' },
    { code: '+57', country: 'Colombia', flag: '🇨🇴' },
    { code: '+58', country: 'Venezuela', flag: '🇻🇪' },
    { code: '+51', country: 'Peru', flag: '🇵🇪' },
    { code: '+593', country: 'Ecuador', flag: '🇪🇨' },
    { code: '+591', country: 'Bolivia', flag: '🇧🇴' },
    { code: '+595', country: 'Paraguay', flag: '🇵🇾' },
    { code: '+598', country: 'Uruguay', flag: '🇺🇾' },
    { code: '+592', country: 'Guyana', flag: '🇬🇾' },
    { code: '+597', country: 'Suriname', flag: '🇸🇷' },
    { code: '+594', country: 'French Guiana', flag: '🇬🇫' },
    
    // Oceania
    { code: '+64', country: 'New Zealand', flag: '🇳🇿' },
    { code: '+679', country: 'Fiji', flag: '🇫🇯' },
    { code: '+685', country: 'Samoa', flag: '🇼🇸' },
    { code: '+676', country: 'Tonga', flag: '🇹🇴' },
    { code: '+678', country: 'Vanuatu', flag: '🇻🇺' },
  ];

  // Filter countries based on search term
  const filteredCountries = countryCodes.filter(country =>
    country.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.includes(searchTerm)
  );

  useEffect(() => {
    // Initialize reCAPTCHA
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'normal',
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
        'expired-callback': () => {
          setError('reCAPTCHA expired. Please try again.');
        }
      });
    }
  }, []);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber) {
      setError('Please enter your phone number');
      return;
    }

    try {
      setError('');
      setLoading(true);
      const fullPhoneNumber = countryCode + phoneNumber;
      const confirmation = await signInWithPhone(fullPhoneNumber, window.recaptchaVerifier!);
      setConfirmationResult(confirmation);
      setCodeSent(true);
    } catch (error: any) {
      setError('Failed to send verification code: ' + error.message);
      // Reset reCAPTCHA
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = undefined;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationCode || !confirmationResult) {
      setError('Please enter the verification code');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await confirmPhoneSignIn(confirmationResult, verificationCode);
      router.push('/dashboard');
    } catch (error: any) {
      setError('Invalid verification code: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in with Phone
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your phone number to receive a verification code
          </p>
        </div>
        
        {!codeSent ? (
          <form className="mt-8 space-y-6" onSubmit={handleSendCode}>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <div className="mt-1 space-y-2">
                <input
                  type="text"
                  placeholder="Search countries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input block w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm placeholder-gray-400"
                />
                <select
                  id="country"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="form-select country-select block w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                >
                  {filteredCountries.map((country) => (
                    <option 
                      key={country.code + country.country} 
                      value={country.code}
                      className="text-gray-900 bg-white"
                    >
                      {country.flag} {country.code} - {country.country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-700 text-sm font-medium">
                  {countryCode}
                </span>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  required
                  className="phone-input flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="1234567890"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Enter your phone number without the country code
              </p>
            </div>

            <div id="recaptcha-container"></div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Verification Code'}
              </button>
            </div>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleVerifyCode}>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              Verification code sent to {countryCode}{phoneNumber}
            </div>
            
            <div>
              <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
                Verification Code
              </label>
              <input
                id="verificationCode"
                name="verificationCode"
                type="text"
                required
                className="verification-input mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify Code'}
              </button>
            </div>

            <div>
              <button
                type="button"
                onClick={() => {
                  setCodeSent(false);
                  setConfirmationResult(null);
                  setVerificationCode('');
                  setError('');
                }}
                className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Use Different Number
              </button>
            </div>
          </form>
        )}

        <div className="text-center">
          <span className="text-sm text-gray-600">
            Want to use email instead?{' '}
            <Link href="/login" className="font-medium text-purple-600 hover:text-purple-500">
              Email Sign In
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
