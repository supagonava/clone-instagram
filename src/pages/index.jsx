import { Avatar, Image, Input, Modal } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import { CloseOutlined, SmallDashOutlined } from "@ant-design/icons";
import {
    InstagramIcon,
    HomeIcon,
    ExplorIcon,
    ReelIcon,
    AddIcon,
    MessageIcon,
    SearchIcon,
    HeartIcon,
    HeartActiveIcon,
    CommentIcon,
    TripleDotIcon,
    BookmarkIcon,
} from "@/components";
import { useNavigate } from "react-router";
import { ConfigContext } from "@/Setup";

export default function HomePage() {
    const { me: meUsername, her: favUsername } = useContext(ConfigContext);
    const audioRef = useRef(null);
    const SEC_PER_IMAGE = 3;
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [showStory, setShowStory] = useState(false);

    const introImages = [
        { path: "/story/1.jpg", message: "ชอบแมว" },
        // { path: "/story/2.jpg", message: "ชอบกวนแมว" },
        { path: "/story/3.jpg", message: "ชอบลาเต้" },
        // { path: "/story/4.jpg", message: "ชอบโชยุราเมง" },
        { path: "/story/5.jpg", message: "ชอบราเมง" },
        { path: "/story/6.jpg", message: "ชอบท้องฟ้า" },
    ];
    const favPersonImages = [
        { path: "/story/7.jpg", message: "💐" },
        { path: "/story/8.jpg", message: "💐" },
        { path: "/story/9.jpg", message: "ขอให้เป็นปีที่ 18 ที่มีความสุขที่สุดเลยนะ <3" },
    ];
    const images = introImages.concat([{ path: "/story/black.jpeg", message: "แล้วก็..." }]).concat(favPersonImages);
    const [intervalId, setIntervalId] = useState(null);

    const onOpenStory = async () => {
        const audio = audioRef.current;
        setShowStory(true);
        audio.play();
        setIsPlaying(true);

        setCurrentTime(0);
        if (!intervalId) {
            const id = setInterval(() => {
                setCurrentTime((prev) => {
                    if (prev + 1 >= images.length * SEC_PER_IMAGE) return 0;
                    return prev + 1;
                });
            }, 1000);
            setIntervalId(id);
        }
    };

    const onCloseStory = async () => {
        const audio = audioRef.current;
        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
        setShowStory(false);

        if (intervalId) {
            setCurrentTime(currentTime + 0);
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };

    const handleTimeUpdate = () => {
        const audioElement = audioRef.current;
        setCurrentTime(audioElement.currentTime);
    };

    useEffect(() => {
        const audioElement = audioRef.current;

        const handleEnded = () => {
            setTimeout(() => {
                audioElement.currentTime = 0;
                audioElement.play();
            }, 800);
        };

        audioElement.addEventListener("ended", handleEnded);

        return () => {
            audioElement.removeEventListener("ended", handleEnded);
        };
    }, []);

    return (
        <>
            <audio ref={audioRef} controls className="hidden">
                <source src="story-background.mp3" type="audio/mpeg" />
            </audio>
            {!showStory && (
                <div className="w-screen flex justify-center overflow-y-scroll">
                    <div className="h-screen flex justify-end items-center flex-col bg-white max-w-md">
                        <div className="h-[70px] border-b border-gray-300 w-full p-[8px] flex justify-between items-center px-[32px]">
                            <div
                                style={{
                                    height: "29px",
                                    width: "103px",
                                }}
                            >
                                {InstagramIcon}
                            </div>
                            <div className="flex justify-end gap-[16px] items-center">
                                <div className="flex items-center bg-gray-200 px-[16px] rounded-lg h-[36px] w-2/3">
                                    {SearchIcon}
                                    <Input className="bg-transparent" bordered={false} value="ค้นหา" />
                                </div>
                                <div className="h-[24px] w-[24px]">{HeartIcon}</div>
                            </div>
                        </div>
                        <div className="h-full border-b border-gray-300 w-full flex flex-col">
                            <div className="p-[16px]">
                                <div className="flex gap-[20px] p-[24px]">
                                    <div className="flex flex-col gap-2 justify-center max-w-[65px]">
                                        <Avatar src="/img/her.jpeg" className="h-[56px] w-[56px]" />
                                        <p className="text-xs truncate">สตอรี่ของ {favUsername}</p>
                                    </div>
                                    <div
                                        onClick={() => onOpenStory()}
                                        className="flex flex-col gap-2 justify-center max-w-[65px] h-full cursor-pointer"
                                    >
                                        <div className="relative">
                                            <div className="absolute bg-gradient-to-tr from-orange-300 to-pink-600 rounded-full h-[60px] w-[60px]"></div>
                                            <Avatar
                                                src="/img/me.jpeg"
                                                className="absolute top-[2px] left-[2px] h-[56px] w-[56px] border border-white"
                                            />
                                        </div>
                                        <p className="text-xs truncate pt-[58px]">{meUsername}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="px-[32px] flex flex-col">
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between">
                                        <div className="flex gap-5">
                                            <Avatar src="/img/me.jpeg" className="h-[40px] w-[40px] border-gray-300" />
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-bold">{meUsername}</p>
                                                    <p className="text-sm">• 1 นาที</p>
                                                </div>
                                                <p className="text-sm">บางซื่อ กรุงเทพฯ</p>
                                            </div>
                                        </div>
                                        <div className="w-[24px] h-[24px]">{TripleDotIcon}</div>
                                    </div>
                                    <Image preview={false} className="max-h-[500px]" src="/img/meme.jpeg" />
                                    <div className="flex justify-between">
                                        <div className="flex gap-4">
                                            <div className="h-[24px] w-[24px]">{HeartActiveIcon}</div>
                                            <div className="h-[24px] w-[24px]">{CommentIcon}</div>
                                        </div>
                                        <div className="h-[24px] w-[24px]">{BookmarkIcon}</div>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <Avatar className="h-[16px] w-[16px]" src="/img/her.jpeg"></Avatar>
                                        <p>ถูกใจโดย</p>
                                        <p className="font-bold">คุณ</p>
                                        <p>และ</p>
                                        <p className="font-bold">คนอื่นๆ</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="font-bold text-base">{meUsername}</div>
                                        <div>ดูสตอรี่เราหน่อยยยยยจิ...</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-around py-[16px] w-full border-t border-gray-300 h-[60px]">
                            <div className="h-[24px] w-[24px] hover:h-[28px] hover:w-[28px]">{HomeIcon}</div>
                            <div className="h-[24px] w-[24px] hover:h-[28px] hover:w-[28px]">{ExplorIcon}</div>
                            <div className="h-[24px] w-[24px] hover:h-[28px] hover:w-[28px]">{ReelIcon}</div>
                            <div className="h-[24px] w-[24px] hover:h-[28px] hover:w-[28px]">{AddIcon}</div>
                            <div className="h-[24px] w-[24px] hover:h-[28px] hover:w-[28px]">{MessageIcon}</div>
                            <div onClick={() => navigate("/")} className="h-[28px] w-[28px] hover:h-[28px] hover:w-[28px]">
                                <Avatar src="/img/her.jpeg" className="h-full w-full border-[2px] border-gray-300" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showStory && (
                <div className="relative w-screen flex justify-center overflow-y-scroll">
                    <div className="h-screen flex items-center flex-col max-w-md w-full bg-black">
                        <div className="h-[80px] flex justify-between py-[16px] items-center w-full px-4">
                            <div className="flex items-center gap-2">
                                <Avatar src="/img/me.jpeg" className="h-[32px] w-[32px]"></Avatar>
                                <div className="flex items-center gap-2">
                                    <div className="text-white">{meUsername}</div>
                                    <div className="text-gray-100">{currentTime} วินาที</div>
                                </div>
                            </div>
                            <div onClick={() => onCloseStory()} className="flex items-center gap-2">
                                <SmallDashOutlined className="text-white text-[26px]" />
                                <CloseOutlined className="text-white text-[26px]" />
                            </div>
                        </div>
                        <div className="flex justify-evenly gap-1 rounded-xl p-1 w-full">
                            {images.map((i, ind) => (
                                <div
                                    key={i}
                                    className={`h-[2px] w-full ${
                                        parseInt(currentTime / SEC_PER_IMAGE) > ind
                                            ? "bg-white"
                                            : parseInt(currentTime / SEC_PER_IMAGE) === ind
                                            ? "bg-blue-500"
                                            : "bg-gray-400"
                                    }`}
                                ></div>
                            ))}
                        </div>
                        <div className="relative w-full h-[85vh]">
                            <p className="text-white text-[24px] absolute z-10 top-[1%] left-[1%] px-2">
                                {images[parseInt(currentTime / SEC_PER_IMAGE)]?.message}
                            </p>
                            <Image
                                height={"100%"}
                                width={"100%"}
                                className="object-cover absolute z-0"
                                preview={false}
                                src={images[parseInt(currentTime / SEC_PER_IMAGE)]?.path}
                            />
                        </div>
                        <div className="h-[80px] flex justify-end py-[16px] items-center w-full px-[16px]">
                            <div className="h-[24px] w-[24px]">{HeartActiveIcon}</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
