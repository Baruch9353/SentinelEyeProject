import initDataApp from "./utils/initDataApp.js";

import Layout from "./components/layout/Layout.jsx";

import AppRoutes from "./AppRoutes.jsx";

export default function App() {
  initDataApp();

  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
}
