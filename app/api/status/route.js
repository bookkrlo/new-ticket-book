export async function GET(request) {
    return new Response(JSON.stringify({ message: 'Server is up' }), {
        headers: { 'Content-Type': 'application/json' },
    });
}
