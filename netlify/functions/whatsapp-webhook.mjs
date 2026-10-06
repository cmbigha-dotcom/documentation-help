export default async (req) => {
  const url = new URL(req.url);

  // Meta webhook verification
  if (req.method === "GET") {
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");

    if (
      mode === "subscribe" &&
      token === process.env.META_VERIFY_TOKEN
    ) {
      return new Response(challenge, { status: 200 });
    }

    return new Response("Forbidden", { status: 403 });
  }

  // WhatsApp webhook events
  if (req.method === "POST") {
    try {
      const body = await req.json();

      console.log("WhatsApp webhook event:", JSON.stringify(body));

      return new Response("EVENT_RECEIVED", { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response("Bad Request", { status: 400 });
    }
  }

  return new Response("Method Not Allowed", { status: 405 });
};
