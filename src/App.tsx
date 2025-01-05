import "./App.css";
import { Chat } from "./components/domain/custom/Chat";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./page/Home.page";
import NotFoundPage from "./page/NotFoundPage";
import { ChatPage } from "./page/ChatPage";
import useChat from "./hooks/use-chat";

function App() {
  const client = useChat();
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/chat" element={<ChatPage client={client} />}></Route>
          <Route
            path="/chat/:id/:nickname"
            element={<Chat client={client} />}
          ></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
