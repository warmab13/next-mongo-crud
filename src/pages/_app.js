import { Layout } from "../components/Layout";
import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};
