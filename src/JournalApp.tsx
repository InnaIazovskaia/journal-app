import AppRouter from "./router/AppRouter";
import { AppTheme } from "./theme";

const JournalApp = (): JSX.Element => (
  <AppTheme>
    <AppRouter />
  </AppTheme>
);

export default JournalApp;
