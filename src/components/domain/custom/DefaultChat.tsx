import { TelepartyClient } from "teleparty-websocket-lib";
import { CreateChatRoom } from "./CreateChatRoom";
import { JoinChatRoom } from "./JoinChatRoom";
const DefaultChatPage = ({ client }: { client: TelepartyClient }) => {
  return (
    <div className="w-full">
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-transparent to-transparent pb-12 pt-28 sm:pb-16 sm:pt-32 lg:pb-24 xl:pb-32 xl:pt-40">
        <div className="relative isolate z-10">
          <div className="absolute -z-10 flex -translate-y-1/2 justify-center overflow-hidden inset-x-0 top-1/2 [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
            <svg
              className="h-[60rem] w-[100rem] flex-none stroke-blue-600 opacity-20"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="e9033f3e-f665-41a6-84ef-756f6778e6fe"
                  width="200"
                  height="200"
                  x="50%"
                  y="50%"
                  patternUnits="userSpaceOnUse"
                  patternTransform="translate(-100 0)"
                >
                  <path d="M.5 200V.5H200" fill="none"></path>
                </pattern>
              </defs>
              <svg x="50%" y="50%" className="overflow-visible fill-blue-50">
                <path
                  d="M-300 0h201v201h-201Z M300 200h201v201h-201Z"
                  strokeWidth="0"
                ></path>
              </svg>
              <rect
                width="100%"
                height="100%"
                strokeWidth="0"
                fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)"
              ></rect>
            </svg>
          </div>
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900 ">
              Teleparty<span className="text-[#889a99]">Chat</span> <br />
              for providing better user experiences
            </h1>
            <h2 className="text-lg leading-8 text-gray-600 mt-6">
              For chat you need to create a chat room or join an existing one
            </h2>
            <div className="flex items-center justify-center gap-x-6 mt-10">
              <CreateChatRoom client={client} />
              <JoinChatRoom client={client} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default DefaultChatPage;
