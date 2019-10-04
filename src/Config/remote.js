
const BASE_URL = 'https://apis.dev.bosframework.com/auth/odata';
 
export default {
    
    APP_KEY: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwMTI4NzMxYi04MWE0LTQ4NDQtOTFmOS03ZTdiODI5OGJmM2QiLCJzdWIiOiJCT1NBcGlLZXkiLCJpYXQiOjE1NzAyMDYxNDMsImFjY291bnQiOiI5M2FhZGM4OC05YjkyLTQ1MmUtOTEzZS1mZmUxY2E5YmY2YTgiLCJwcm9qZWN0IjoiODYyMzFkNDItNzliNy00OTE4LWIyZTUtNmJlNTJmOGQ1YWI4IiwidGVuYW50IjoiMDA4ODM4NDctY2ViNS00Mzg5LWFjNDAtNmY2MjE0Y2M2ODU0In0.zyAOtnKaahTa8B26hBYQDGF-dhiVLOTBCpIsDlU7j8s',
    SEND_GRID_KEY: 'Bearer ',
    
    SEND_GRID_API: 'https://api.sendgrid.com/v3/mail/send',

    SIGNIN: `${BASE_URL}/Verification?api-version=1.0`,
    SIGNUP: `${BASE_URL}/Users`,
    GET_USER_DATA: `${BASE_URL}/Users`,
    UPDATE_USER_DATA: `${BASE_URL}/Users`,
    GET_USER_ID: `${BASE_URL}/users?$filter=email eq `,
    FORGOT_PASSWORD: `${BASE_URL}/Users`,
    
};