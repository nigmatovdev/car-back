// Automated API Testing Script
// Run with: node scripts/test-api.js

const http = require('http');

const BASE_URL = 'http://localhost:3000';
let accessToken = '';
let refreshToken = '';

// Helper function to make HTTP requests
function makeRequest(method, path, data = null, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(url, options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = body ? JSON.parse(body) : {};
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Test functions
async function testHealthCheck() {
  console.log('\n1. Testing Health Check (GET /)...');
  try {
    const response = await makeRequest('GET', '/');
    console.log('   Status:', response.status);
    console.log('   Response:', response.data);
    return response.status === 200;
  } catch (error) {
    console.error('   Error:', error.message);
    return false;
  }
}

async function testRegister() {
  console.log('\n2. Testing Register (POST /auth/register)...');
  try {
    const testEmail = `test${Date.now()}@example.com`;
    const response = await makeRequest('POST', '/auth/register', {
      email: testEmail,
      password: 'password123',
      role: 'CUSTOMER',
    });
    console.log('   Status:', response.status);
    if (response.status === 201 && response.data.accessToken) {
      accessToken = response.data.accessToken;
      refreshToken = response.data.refreshToken;
      console.log('   ✓ Registration successful');
      console.log('   User ID:', response.data.user.id);
      console.log('   Email:', response.data.user.email);
      return true;
    } else {
      console.log('   Response:', response.data);
      return false;
    }
  } catch (error) {
    console.error('   Error:', error.message);
    return false;
  }
}

async function testLogin() {
  console.log('\n3. Testing Login (POST /auth/login)...');
  try {
    // First register a user
    const testEmail = `test${Date.now()}@example.com`;
    await makeRequest('POST', '/auth/register', {
      email: testEmail,
      password: 'password123',
    });

    // Then try to login
    const response = await makeRequest('POST', '/auth/login', {
      email: testEmail,
      password: 'password123',
    });
    console.log('   Status:', response.status);
    if (response.status === 200 && response.data.accessToken) {
      accessToken = response.data.accessToken;
      refreshToken = response.data.refreshToken;
      console.log('   ✓ Login successful');
      return true;
    } else {
      console.log('   Response:', response.data);
      return false;
    }
  } catch (error) {
    console.error('   Error:', error.message);
    return false;
  }
}

async function testGetMe() {
  console.log('\n4. Testing Get Current User (GET /auth/me)...');
  if (!accessToken) {
    console.log('   ⚠ Skipped: No access token available');
    return false;
  }
  try {
    const response = await makeRequest('GET', '/auth/me', null, accessToken);
    console.log('   Status:', response.status);
    if (response.status === 200) {
      console.log('   ✓ Get user successful');
      console.log('   User:', response.data);
      return true;
    } else {
      console.log('   Response:', response.data);
      return false;
    }
  } catch (error) {
    console.error('   Error:', error.message);
    return false;
  }
}

async function testRefreshToken() {
  console.log('\n5. Testing Refresh Token (POST /auth/refresh)...');
  if (!refreshToken) {
    console.log('   ⚠ Skipped: No refresh token available');
    return false;
  }
  try {
    const response = await makeRequest(
      'POST',
      '/auth/refresh',
      { refreshToken },
      refreshToken,
    );
    console.log('   Status:', response.status);
    if (response.status === 200 && response.data.accessToken) {
      accessToken = response.data.accessToken;
      refreshToken = response.data.refreshToken;
      console.log('   ✓ Token refresh successful');
      return true;
    } else {
      console.log('   Response:', response.data);
      return false;
    }
  } catch (error) {
    console.error('   Error:', error.message);
    return false;
  }
}

// Run all tests
async function runTests() {
  console.log('🚀 Starting API Tests...');
  console.log('📍 Base URL:', BASE_URL);
  console.log('⏳ Make sure the server is running on port 3000\n');

  const results = {
    healthCheck: await testHealthCheck(),
    register: await testRegister(),
    login: await testLogin(),
    getMe: await testGetMe(),
    refreshToken: await testRefreshToken(),
  };

  console.log('\n' + '='.repeat(50));
  console.log('📊 Test Results:');
  console.log('='.repeat(50));
  Object.entries(results).forEach(([test, passed]) => {
    console.log(`${passed ? '✓' : '✗'} ${test}: ${passed ? 'PASSED' : 'FAILED'}`);
  });

  const passedCount = Object.values(results).filter(Boolean).length;
  const totalCount = Object.keys(results).length;
  console.log('\n' + '='.repeat(50));
  console.log(`Total: ${passedCount}/${totalCount} tests passed`);
  console.log('='.repeat(50));

  if (passedCount === totalCount) {
    console.log('\n🎉 All tests passed!');
    process.exit(0);
  } else {
    console.log('\n❌ Some tests failed. Check the output above.');
    process.exit(1);
  }
}

// Check if server is running
makeRequest('GET', '/')
  .then(() => {
    runTests();
  })
  .catch((error) => {
    console.error('❌ Cannot connect to server at', BASE_URL);
    console.error('   Make sure the server is running: npm run start:dev');
    console.error('   Error:', error.message);
    process.exit(1);
  });

