import http from 'k6/http';
import { check } from 'k6';

const data =  JSON.parse(open('../body.json'));

export const options = {
  scenarios: {
    growing_scenario: {
      executor: 'ramping-vus',
      startVUs: 1,
      stages: [
          { duration: '5s', target: 10 },
          { duration: '5s', target: 25 },
          { duration: '5s', target: 50 },
          { duration: '5s', target: 25 },
          { duration: '5s', target: 10 }
      ],
    },
  },
        thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<300'], // 95% of requests should be below 200ms
        http_reqs: ['count>=0'],
 },
};

export default function () {
    const url = 'http://localhost:8000/test';
    const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
    const response = http.request('POST', url, JSON.stringify(data), params);
    check(response, {'status is 200': (r) => r.status === 200});
}
