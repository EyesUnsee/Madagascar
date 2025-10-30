
exports.handler = async (event) => {
  const headers = event.headers || {};
  const ip =
    headers['x-nf-client-connection-ip'] ||
    headers['x-forwarded-for'] ||
    headers['client-ip'] ||
    'IP inconnue';

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ip }),
  };
};
