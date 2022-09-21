import Profile from "../components/Profile";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import { UserRole } from "../auth/roles";

interface Props {
    text: String;
}
const ProfilePage = ({}: Props) => <Profile />;

export default ProfilePage;

const getServerSidePropsInner: GetServerSideProps<Props> = async ({}) => {
    return { props: { text: "test" } };
}

type WithRoles<T extends Record<string, any>> = T & { roles: UserRole[]; };

export const test = withPageAuthRequired();
