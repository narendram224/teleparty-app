import "./App.css";
import { Chat } from "./components/domain/custom/Chat";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFoundPage from "./page/NotFoundPage";
import { ChatPage } from "./page/ChatPage";
import useChat from "./hooks/use-chat";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const client = useChat();
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<ChatPage client={client} />}></Route>
          <Route path="/chat" element={<ChatPage client={client} />}></Route>
          <Route
            path="/chat/:id/:nickname"
            element={<Chat client={client} />}
          ></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
