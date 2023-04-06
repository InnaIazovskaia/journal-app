import { Routes, Route } from "react-router-dom";
import { AuthRouts } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";

const AppRouter = () => (
  <Routes>
    <Route path="/auth/*" element={<AuthRouts />} />
    <Route path="/*" element={<JournalRoutes />} />
  </Routes>
);

export default AppRouter;
