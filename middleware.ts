import { type NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";
import { premiumUpdateSession } from "./utils/supabase/premiumMiddleare";

const premiumRoutes: string[] = ["/editor"];
const privateRoutes: string[] = [];

export async function middleware(request: NextRequest) {
  const requestPath = request.nextUrl.pathname;

  // Check if this is an API route or media file - skip Facebook tracking for these
  const isApiRoute = requestPath.startsWith("/api");
  const isMediaFile =
    /\.(mp4|webm|ogg|mp3|wav|flac|aac|wma|mov|avi|wmv|flv|mkv)$/i.test(
      requestPath
    );
  const shouldTrackFacebook = !isApiRoute && !isMediaFile;

  // INSERT_YOUR_CODE
  // Example: Send a POST request to an API endpoint (without imports, as not allowed at this insertion point)
  // We'll use fetch; note: middleware runs in the Edge Runtime so fetch is available
  if (shouldTrackFacebook) {
    try {
      const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL;
      const conversionApiKey = process.env.FB_CONVERSION_API_KEY;
      const nowTime = Math.floor(Date.now() / 1000);

      // Get client IP address - try multiple headers for different hosting providers
      const getClientIp = () => {
        const forwardedFor = request.headers.get("x-forwarded-for");
        if (forwardedFor) {
          // x-forwarded-for can contain multiple IPs, the first one is the client
          return forwardedFor.split(",")[0].trim();
        }
        return (
          request.headers.get("x-real-ip") ||
          request.headers.get("cf-connecting-ip") || // Cloudflare
          request.headers.get("true-client-ip") || // Cloudflare Enterprise
          (request as any).ip || // Next.js request.ip
          undefined
        );
      };

      console.log(getClientIp());

      const body = JSON.stringify({
        ...(() => {
          const payload: any = {
            data: [
              {
                event_name: "ViewContent",
                event_time: nowTime,
                action_source: "website",
                user_data: {
                  client_ip_address: getClientIp(),
                  client_user_agent: request.headers.get("user-agent"),
                },
                custom_data: {
                  content_name: requestPath,
                },
                original_event_data: {
                  event_name: "ViewContent",
                  event_time: nowTime,
                },
              },
            ],
          };
          if (process.env.NODE_ENV === "development") {
            payload.test_event_code = process.env.FACEBOOK_TEST_EVENT_CODE;
          }
          return payload;
        })(),
      });

      fetch(
        `https://graph.facebook.com/v22.0/${pixelId}/events?access_token=${conversionApiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        }
      );
    } catch (error) {
      console.error("Failed to send event to Facebook Pixel");
    }
  }

  if (privateRoutes.some((route) => requestPath.startsWith(route))) {
    return await updateSession(request, requestPath);
  } else if (premiumRoutes.some((route) => requestPath.startsWith(route))) {
    return await premiumUpdateSession(request, requestPath);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
