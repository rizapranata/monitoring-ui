import * as React from "react";
import TopBar from "../../components/TopBar";
import { Link } from "react-router-dom";

import { Responsive, LayoutOne, Card, Text, CardError } from "upkit";
import { useSelector } from "react-redux";
import FaUserCog from "@meronex/icons/fa/FaUserCog";
import FaProjectDiagram from "@meronex/icons/fa/FaProjectDiagram";
import FiUsers from "@meronex/icons/fi/FiUsers";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

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
  const { user } = useSelector((state) => state.auth);
  const history = useHistory();

  if (user === null) {
    history.push("/login");
  }

  return (
    <LayoutOne>
      <TopBar />
      {/* <div className="text-black-100 font-medium text-2x1">
        <Text as="h5">Menu Utama</Text>
      </div>
      <br /> */}
      <br />
      <div className="items-center justify-left mt-5">
        <h1 className="text-3xl font-bold text-black-100">{`Selamat datang ${user.name}!`}</h1>
        <h3 className="text-2x1 text-black-100 mb-5">{`Semoga hari anda sebagai ${user.role} selalu menyenangkan :)`}</h3>
      </div>

      {user.status === false ? (
        <>
          <br />
          <CardError
            title="Perhatian!"
            message="Akun anda telah dinonaktifkan, silahkn hubungi super admin"
          />
        </>
      ) : (
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
      )}
    </LayoutOne>
  );
}
