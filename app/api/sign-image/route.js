import { v2 as cloudinary } from 'cloudinary';

export async function POST(req, res) {
  try {
    const body = await req.json();

    const signature = cloudinary.utils.api_sign_request(
      body.paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );

    return new Response(
      JSON.stringify({
        signature,
        paramsToSign: body.paramsToSign,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in /api/sign-image:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to generate Cloudinary signature',
      }),
      { status: 500 }
    );
  }
}
