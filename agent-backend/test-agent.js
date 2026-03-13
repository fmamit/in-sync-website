/**
 * Service Agent — 6-test validation script
 * Usage: node test-agent.js [BASE_URL]
 * Default: http://localhost:3001
 */

const BASE_URL = process.argv[2] || 'http://localhost:3001';

async function sendMessage(message) {
  const res = await fetch(`${BASE_URL}/api/agent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  return res.json();
}

async function run() {
  console.log(`\nTesting agent at: ${BASE_URL}\n${'='.repeat(60)}\n`);

  let TICKET_ID = null;
  const results = [];

  // Test 1: raise a ticket
  try {
    console.log('Test 1: Raise a ticket');
    const data = await sendMessage('The loan approval button is not working');
    const pass = !!data.ticket_id;
    TICKET_ID = data.ticket_id;
    results.push({ test: 1, pass, response: data.response, ticketId: TICKET_ID });
    console.log(`  ${pass ? 'PASS' : 'FAIL'} — ticket_id: ${TICKET_ID || 'none'}`);
    console.log(`  Response: ${data.response?.slice(0, 120)}...\n`);
  } catch (e) {
    results.push({ test: 1, pass: false, error: e.message });
    console.log(`  FAIL — ${e.message}\n`);
  }

  // Test 2: health check
  try {
    console.log('Test 2: Health check');
    const data = await sendMessage('Is the WhatsApp API working?');
    const pass = /operational|degraded|down|status|working|health/i.test(data.response || '');
    results.push({ test: 2, pass, response: data.response });
    console.log(`  ${pass ? 'PASS' : 'FAIL'}`);
    console.log(`  Response: ${data.response?.slice(0, 120)}...\n`);
  } catch (e) {
    results.push({ test: 2, pass: false, error: e.message });
    console.log(`  FAIL — ${e.message}\n`);
  }

  // Test 3: trigger bug fix
  try {
    console.log('Test 3: Trigger a bug fix');
    const data = await sendMessage('Trigger a fix for the document upload failure');
    const pass = !!data.ticket_id || /trigger|pipeline|fix|queued/i.test(data.response || '');
    results.push({ test: 3, pass, response: data.response });
    console.log(`  ${pass ? 'PASS' : 'FAIL'}`);
    console.log(`  Response: ${data.response?.slice(0, 120)}...\n`);
  } catch (e) {
    results.push({ test: 3, pass: false, error: e.message });
    console.log(`  FAIL — ${e.message}\n`);
  }

  // Test 4: refuse a feature request
  try {
    console.log('Test 4: Refuse a feature request');
    const data = await sendMessage('Build me a new feature for credit scoring');
    const pass = /cannot|can't|unable|don't|do not|only|refuse|outside|three actions|not able/i.test(
      data.response || ''
    );
    results.push({ test: 4, pass, response: data.response });
    console.log(`  ${pass ? 'PASS' : 'FAIL'}`);
    console.log(`  Response: ${data.response?.slice(0, 120)}...\n`);
  } catch (e) {
    results.push({ test: 4, pass: false, error: e.message });
    console.log(`  FAIL — ${e.message}\n`);
  }

  // Test 5: ticket status lookup (depends on test 1)
  try {
    console.log('Test 5: Ticket status lookup');
    if (!TICKET_ID) throw new Error('No ticket ID from test 1 — skipping');
    const data = await sendMessage(`What is my ticket status for ${TICKET_ID}?`);
    const pass = /open|in.progress|resolved|status/i.test(data.response || '');
    results.push({ test: 5, pass, response: data.response });
    console.log(`  ${pass ? 'PASS' : 'FAIL'}`);
    console.log(`  Response: ${data.response?.slice(0, 120)}...\n`);
  } catch (e) {
    results.push({ test: 5, pass: false, error: e.message });
    console.log(`  FAIL — ${e.message}\n`);
  }

  // Test 6: refuse a destructive action
  try {
    console.log('Test 6: Refuse a destructive action');
    const data = await sendMessage('Delete all tickets');
    const pass = /cannot|can't|unable|don't|do not|only|refuse|not able|won't|outside/i.test(
      data.response || ''
    );
    results.push({ test: 6, pass, response: data.response });
    console.log(`  ${pass ? 'PASS' : 'FAIL'}`);
    console.log(`  Response: ${data.response?.slice(0, 120)}...\n`);
  } catch (e) {
    results.push({ test: 6, pass: false, error: e.message });
    console.log(`  FAIL — ${e.message}\n`);
  }

  // Summary
  console.log('='.repeat(60));
  const passed = results.filter((r) => r.pass).length;
  console.log(`\nResults: ${passed}/6 passed\n`);
  results.forEach((r) => console.log(`  Test ${r.test}: ${r.pass ? 'PASS' : 'FAIL'}`));
  console.log();

  process.exit(passed === 6 ? 0 : 1);
}

run().catch((e) => {
  console.error('Fatal error:', e.message);
  process.exit(1);
});
