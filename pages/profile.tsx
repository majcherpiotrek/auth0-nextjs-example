import Profile from "../components/Profile";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const ProfilePage = withPageAuthRequired(() => <Profile />);

export default ProfilePage;
