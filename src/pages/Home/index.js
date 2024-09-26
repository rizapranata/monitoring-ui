import * as React from "react";
import TopBar from "../../components/TopBar";
import { Link } from "react-router-dom";

import {
  Responsive,
  LayoutOne,
  Card,
  Text,
  CardError,
  FormControl,
  InputText,
  Button,
} from "upkit";
import { useSelector } from "react-redux";
import FaUserCog from "@meronex/icons/fa/FaUserCog";
import FaProjectDiagram from "@meronex/icons/fa/FaProjectDiagram";
import FiUsers from "@meronex/icons/fi/FiUsers";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useForm } from "react-hook-form";
import { rules } from "./validations";

const IconWrapper = ({ children }) => {
  return (
    <div className="text-white text-5xl flex justify-center mb-5">
      {children}
    </div>
  );
};

const menus = [
  {
    label: "Projects",
    icon: (
      <IconWrapper>
        <FaProjectDiagram />
      </IconWrapper>
    ),
    url: "/project-client",
    // url: "/manajement-project",
    guard: "admin",
  },
  {
    label: "Projek Saya",
    icon: (
      <IconWrapper>
        <FaProjectDiagram />
      </IconWrapper>
    ),
    url: "/project",
    guard: "client",
  },
  // {
  //   label: "Progress",
  //   icon: (
  //     <IconWrapper>
  //       <MdcProgressWrench />
  //     </IconWrapper>
  //   ),
  //   url: "/manajement-progress",
  //   guard: "admin",
  // },
  {
    label: "Menejemen Admin",
    icon: (
      <IconWrapper>
        <FaUserCog />
      </IconWrapper>
    ),
    url: "/user/admin",
    guard: "superAdmin",
  },
  {
    label: "Menejemen Client",
    icon: (
      <IconWrapper>
        <FiUsers />
      </IconWrapper>
    ),
    url: "/user/client",
    guard: "superAdmin",
  },
];

export default function Home() {
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);
  const { handleSubmit, register, watch, errors, getValues } = useForm();

  watch();

  React.useEffect(() => {
    register({ name: "noResi" }, rules.noResi);
  }, [register]);

  const onSubmit = async (formHook) => {
    // usernameClient
    // projectName
    // projectId

    history.push(`/preview/${formHook.noResi}`); //TODO harus di convert
    // history.push(`/preview/${customer}/${projectName}/${projectId}`);
  };

  return (
    <LayoutOne>
      <TopBar />
      <br />
      {user !== null ? (
        <div className="items-center justify-left mt-5">
          <h1 className="text-3xl font-bold text-black-100">{`Selamat datang ${user.name}!`}</h1>
          <h3 className="text-2x1 text-black-100 mb-5">{`Semoga hari anda sebagai ${user.role} selalu menyenangkan :)`}</h3>
        </div>
      ) : (
        <div>
          <div className="items-center justify-left mt-5">
            <h1 className="text-3xl font-bold text-black-100">{`Selamat datang..!`}</h1>
            <h3 className="text-2x1 text-black-100 mb-5">{`Untuk melihat progress project, masukkan no resi yang sudah anda dapatkan dari Admin.`}</h3>
          </div>
          <div className="flex items-center justify-center py-20 my-20">
            <div className="w-full max-w-lg">
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl
                  label="Masukkan no Resi"
                  errorMessage={errors.noResi?.message}
                  color="black"
                >
                  <InputText
                    placeholder="nomor resi.."
                    fitContainer
                    name="noResi"
                    fullRound={true}
                    defaultValue={getValues().noResi}
                    ref={register(rules.noResi)}
                  />
                </FormControl>
                <Button fitContainer>Submit</Button>
              </form>
            </div>
          </div>
        </div>
      )}

      {user !== null && user.status === false ? (
        <>
          <br />
          <CardError
            title="Perhatian!"
            message="Akun anda telah dinonaktifkan, silahkn hubungi super admin"
          />
        </>
      ) : (
        user !== null && (
          <Responsive desktop={4} tablet={4} mobile={2}>
            {menus
              .filter((menu) => menu.guard === user.role)
              .map((menu, index) => {
                return (
                  <div key={index} className="px-2 pb-2">
                    <Link to={menu.url}>
                      <Card
                        header={menu.icon}
                        body={
                          <div className="text-center font-bold text-white">
                            {menu.label}
                          </div>
                        }
                      />
                    </Link>
                  </div>
                );
              })}
          </Responsive>
        )
      )}
    </LayoutOne>
  );
}
