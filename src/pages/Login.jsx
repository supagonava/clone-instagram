import { ConfigContext } from "@/Setup";
import { InstagramIcon } from "@/components";
import { Avatar } from "antd";
import React, { useContext } from "react";
import { useNavigate } from "react-router";

const Login = () => {
    const navigate = useNavigate();
    const { her: username } = useContext(ConfigContext);
    const profileImage = "/img/her.jpeg";
    return (
        <div className="h-screen w-screen flex justify-center overflow-y-scroll">
            <div className="w-full max-w-md flex flex-col justify-between items-center bg-white">
                <div className="flex flex-col w-4/5 h-full justify-center">
                    <div className="p-[18px] border border-gray-300 flex flex-col gap-3 items-center">
                        <div className="w-[175px] h-[51px]">{InstagramIcon}</div>
                        <Avatar src={profileImage} className="h-[120px] w-[120px]" />
                        <button onClick={() => navigate("/home")} className="w-full py-1 rounded-md bg-[#0095f6] text-white font-bold">
                            ดำเนินการต่อในชื่อ {username}
                        </button>
                        <div className="flex gap-2">
                            <p>ไม่ใช่ {username} ใช่ไหม </p>
                            <a className="text-[#0095f6] font-bold">สลับบัญชี</a>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-8 pb-[16px]">
                    <div className="flex gap-2 flex-wrap text-sm text-slate-600 px-2 justify-center">
                        <div>Meta</div>
                        <div>เกี่ยวกับ</div>
                        <div>บล็อก</div>
                        <div>งาน</div>
                        <div>ความช่วยเหลือ</div>
                        <div>API</div>
                        <div>ความเป็นส่วนตัว</div>
                        <div>ข้อกำหนด</div>
                        <div>บัญชียอดนิยม</div>
                        <div>ตำแหน่ง</div>
                        <div>Instagram Lite</div>
                        <div>Threads</div>
                        <div>การอัพโหลดผู้ติดต่อและผู้ที่ไม่ได้ใช้บริการ</div>
                        <div>Meta Verified</div>
                        <div>ภาษาไทย</div>
                    </div>
                    <div className="text-slate-600 px-2">ภาษาไทย © 2023 Instagram from Meta</div>
                </div>
            </div>
        </div>
    );
};

export default Login;
