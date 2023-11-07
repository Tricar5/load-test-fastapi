import http from 'k6/http';
import { check } from 'k6';

const url = 'http://localhost:8000/test';
const payload = JSON.stringify({
      data: 5
  });

const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

export const options = {
    scenarios: {
        test_counters: {
            executor: 'constant-arrival-rate',
            rate: 400,
            duration: '20s',
            preAllocatedVUs: 10000,
        },
    },
    thresholds: {
        // Hack to surface these sub-metrics (https://github.com/k6io/docs/issues/205)
        'http_req_duration': ['max>=0'],
        'http_reqs': ['count>=0'],

    },
};

export default function () {


  const response = http.request('POST', url, payload, params);
  check(response, {'status is 200': (r) => r.status === 200});
}
