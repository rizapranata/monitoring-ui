/* eslint-disable jsx-a11y/img-redundant-alt */
import * as React from "react";
import { LayoutOne, Text, Badge } from "upkit";
import { Link } from "react-router-dom";
import TopBar from "../../components/TopBar";
import FiLogout from "@meronex/icons/fi/FiLogOut"
import { useSelector } from "react-redux";

export default function UserAccount() {
  let { user } = useSelector((state) => state.auth);
  const { name, email, phone, address, specialist, status, role } = user;
  console.log(user);
  return (
    <LayoutOne>
      <TopBar />
      <Text as="h3">Akun Anda</Text>
      <br />
      <div className="bg-gray-100">
        <div className=" mx-auto bg-white rounded-lg shadow-lg">
          <div className="p-4">
            <img
              src={"https://via.placeholder.com/150"}
              alt="Profile Picture"
              className="rounded-full mx-auto"
            />
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              {name}
            </h2>
            <h6 className="text-gray-500 text-center">({role})</h6> 
          </div>
          <hr />
          <div className="bg-gray-200 p-2">
            <ul className="text-sm text-gray-700">
              <li className="py-1">
                <Text className="font-semibold">Spesialis:</Text> {specialist}
              </li>
              <li className="py-1">
                <Text className="font-semibold">Email:</Text> {email}
              </li>
              <li className="py-1">
                <Text className="font-semibold">No. Telp:</Text> {phone}
              </li>
              <li className="py-1">
                <Text className="font-semibold">Alamat:</Text> {address}
              </li>
              <li className="py-1">
                <Text className="font-semibold">Status:</Text>{" "}
                {status ? <Badge color="green">Aktif</Badge> : <Badge color="red">Tidak aktif</Badge> }
              </li>
              <br/>
              <li className="py-1 flex items-center space-x-2 cursor-pointer">
                <FiLogout />
                <Link className="text-orange-500" to={"/logout"}>Keluar</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </LayoutOne>
  );
}
