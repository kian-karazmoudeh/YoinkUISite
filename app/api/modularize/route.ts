// import { NextRequest, NextResponse } from 'next/server';
// import { createClient } from '@supabase/supabase-js';
// import OpenAI from 'openai';

// // Initialize Supabase client
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // Authentication middleware
// async function authenticate(request: NextRequest) {
//   const headersList = request.headers;
//   const authHeader = headersList.get('Authorization');

//   if (!authHeader?.startsWith('Bearer ')) {
//     return null;
//   }

//   const token = authHeader.split(' ')[1];
//   console.log(token)
//   const { data: { user }, error } = await supabase.auth.getUser(token);

//   console.log(error);

//   if (error || !user) {
//     return null;
//   }

//   return user;
// }

// export async function POST(request: NextRequest) {
//   try {
//     // Verify authentication
//     const user = await authenticate(request);

//     if (!user) {
//       return NextResponse.json(
//         { error: 'Unauthorized' },
//         { status: 401 }
//       );
//     }

//     // Parse the JSON body
//     const body = await request.text();

//     const { error, output_text } = await openai.responses.create({
//       model: "gpt-4.1-mini",
//       input: [
//         {
//           "role": "system",
//           "content": [
//             {
//               "type": "input_text",
//               "text": "your job is to parse the following html tailwind code and convert it into modular and clean react components. Don't use any hooks in the components. output the component files as json with each filename as key and file content as the value. \nif you see any unoptimized tailwind classes, simplify them. if you see any redundent HTML tags that will never be displayed, remove them. if you see any tags which are not HTML standard, convert them to basic html tags such as div."
//             }
//           ]
//         },
//         {
//           "role": "developer",
//           "content": [
//             {
//               type: "input_text",
//               text: body
//             }
//           ]
//         }
//       ],
//       text: { "format": { "type": "json_object" } },
//       reasoning: {},
//       tools: [],
//       temperature: 1,
//       max_output_tokens: 32768,
//       top_p: 1,
//       store: true
//     });

//     if (error) {
//       console.error(error)
//       return NextResponse.json(
//         { error: 'Internal Server Error' },
//         { status: 500 }
//       );
//     }

//     // const responseData = {
//     //   message: 'Data received successfully',
//     //   data: body,
//     //   userId: user.id
//     // };

//     return NextResponse.json(JSON.parse(output_text), { status: 200 });

//   } catch (error) {
//     console.error(error)
//     return NextResponse.json(
//       { error: 'Internal Server Error' },
//       { status: 500 }
//     );
//   }
// }
