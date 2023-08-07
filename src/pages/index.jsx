import { Avatar, Image, Input, Modal } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import { CloseOutlined, PauseOutlined, SmallDashOutlined } from "@ant-design/icons";
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
import { Transition } from "@headlessui/react";

export default function HomePage() {
    const { me: meUsername, her: favUsername } = useContext(ConfigContext);
    const audioRef = useRef(null);
    const SEC_PER_IMAGE = 6;
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentImage, setCurrenImage] = useState(0);
    const [currentMusicSec, setCurrentMusicSec] = useState(0);
    const [showStory, setShowStory] = useState(false);
    const [watched, setWatched] = useState(false);
    const [karaoke, setKaraoke] = useState([
        { eng: "Ikaw at ikaw (ikaw at ikaw, ikaw at ikaw)", tha: "ขอแค่มีเธอเพียงคนเดียว", start_at: 3, end_at: 13 },
        { eng: "Ikaw at ikaw (ikaw at ikaw, ikaw at ikaw)", tha: "ขอแค่เธอแล้วผมจะไม่ขออะไรอีก", start_at: 13, end_at: 20 },
        { eng: "Ikaw at ikaw (ikaw at ikaw, ikaw at ikaw)", tha: "เพียงเธอเท่านั้น", start_at: 20, end_at: 25 },
        { eng: "Ikaw at ikaw (ikaw at ikaw, ikaw at ikaw)", tha: "ชีวิตผมขอแค่เธอก็พอแล้ว", start_at: 25.0, end_at: 29 },
        { eng: "palad ay basang-basa", tha: "ทำไมมือผมมันชุ่มเหงื่อกันนะ", start_at: 29, end_at: 32 },
        { eng: "Ang dagitab ay damang-dama", tha: "รู้สึกประหม่าไปหมดเลย", start_at: 32, end_at: 35 },
        { eng: "Sa 'king kalamnang punong-puno", tha: "เหมือนว่าหัวใจผมไปอยู่กะเธอซะแล้ว", start_at: 35, end_at: 40 },
        { eng: "'Di maikukumpara", tha: "ไม่มีใครแทนที่เธอได้เลย", start_at: 40, end_at: 43 },
        { eng: "Araw-araw kong dala-dala", tha: "อยากจะไปทุก ๆ ที่กับเธอสองคน", start_at: 43, end_at: 46 },
        { eng: "Paboritong panalangin ko'y", tha: "สิ่งที่ผมปรารถนาที่สุดก็คงเป็น...", start_at: 46, end_at: 51 },
        { eng: "ikaw, เธอ", tha: "(แหะๆ รูปน้อยไปหน่อย >//<)", start_at: 51, end_at: 54 },
    ]);

    const introImages = [
        { path: "/story/1.jpg", message: "like cat" },
        // { path: "/story/3.jpg", message: "like coffee" },
        { path: "/story/5.jpg", message: "like ramen" },
        { path: "/story/6.jpg", message: "like sky" },
    ];
    const favPersonImages = [
        { path: "/story/10.jpg", message: "like sea 😎" },
        { path: "/story/9.jpg", message: "like camera 😎 🤏" },
        { path: "/story/7.jpg", message: "like fruit 🤩 🕶️ 🤏" },
        { path: "/story/8.jpg", message: "like cafe 😳 ⭐⭐ 🤏" },
        { path: "/story/11.jpg", message: "like u smile 😍😳" },
        { path: "/story/black.jpeg", message: "like ⬇️" },
    ];
    const images = introImages.concat(favPersonImages);
    let intervalId = useRef(null);
    let mapped = useRef({});

    const intervaltime = () =>
        setInterval(() => {
            setCurrentTime((prev) => {
                if (!mapped.current[prev + 1]) {
                    if ((prev + 1) % SEC_PER_IMAGE === 0 && currentImage < images.length - 1) {
                        toNextImage();
                    }
                    mapped.current[prev + 1] = true;
                }
                return prev + 1;
            });
        }, 1000);

    const onOpenStory = async () => {
        setWatched(true);
        const audio = audioRef.current;
        setShowStory(true);
        audio.play();
        setIsPlaying(true);
        setCurrentTime(0);
        intervalId.current = intervaltime();
    };

    const onCloseStory = async () => {
        setIsPlaying(false);
        setShowStory(false);

        const audio = audioRef.current;
        audio.pause();
        audio.currentTime = 0;

        setCurrenImage(0);
        setCurrentTime(0);
        clearInterval(intervalId.current);
        intervalId.current = null;
        mapped.current = {};
    };

    const toNextImage = () => {
        console.log("toNextImage");
        setCurrenImage((curImage) => {
            if (curImage + 1 >= images.length) {
                return curImage;
            }
            return curImage + 1;
        });
    };

    const toPrevImage = () => {
        console.log("toPrevImage");
        setCurrenImage((curImage) => {
            if (curImage >= 1) {
                return curImage - 1;
            }
            return curImage;
        });
    };

    const handleTimeUpdate = () => {
        const audioElement = audioRef.current;
        setCurrentMusicSec(parseFloat(audioElement.currentTime));
    };

    const onHold = () => {
        const audioElement = audioRef.current;
        audioElement.pause();
        setIsPlaying(false);
        clearInterval(intervalId.current);
        intervalId.current = null;
    };

    const onResume = () => {
        const audioElement = audioRef.current;
        audioElement.play();
        setIsPlaying(true);
        intervalId.current = intervaltime();
    };

    useEffect(() => {
        const audioElement = audioRef.current;

        const handleEnded = () => {
            onCloseStory();
        };

        audioElement.addEventListener("ended", handleEnded);

        return () => {
            audioElement.removeEventListener("ended", handleEnded);
        };
    }, []);

    return (
        <>
            <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} controls className="hidden">
                <source src="story-background.mp3" type="audio/mpeg" />
            </audio>
            {!showStory && (
                <div className="w-screen flex justify-center overflow-y-scroll">
                    <div className="h-screen flex justify-end items-center flex-col bg-white max-w-md">
                        <div className="h-[70px] border-b border-gray-300 w-full p-[8px] flex justify-between items-center px-[32px]">
                            <div className="flex flex-col items-center justify-center h-[32px] w-[103px]">{InstagramIcon}</div>
                            <div className="flex justify-end gap-[16px] items-center">
                                <div className="flex items-center bg-gray-200 px-[16px] rounded-lg h-[36px] w-2/3">
                                    {SearchIcon}
                                    <Input className="bg-transparent" bordered={false} value="ค้นหา" />
                                </div>
                                <div className="h-[24px] w-[24px]">{HeartIcon}</div>
                            </div>
                        </div>
                        <div className="h-full overflow-scroll border-b border-gray-300 w-full flex flex-col">
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
                                            {!watched && (
                                                <div className="absolute bg-gradient-to-tr from-orange-300 to-pink-600 rounded-full h-[60px] w-[60px]"></div>
                                            )}
                                            {watched && <div className="absolute bg-gray-300 rounded-full h-[60px] w-[60px]"></div>}
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
                                                <p className="text-sm">บางแสน ชลบุรี</p>
                                            </div>
                                        </div>
                                        <div className="w-[24px] h-[24px]">{TripleDotIcon}</div>
                                    </div>
                                    {/* <Image preview={false} className="max-h-[500px]" src="/img/meme.jpeg" /> */}
                                    <div className="h-[500px] bg-black flex flex-col justify-center items-center text-white text-center px-8 gap-4">
                                        <p className="text-xl">หมอนที่จริงใจ + ปลุกเสกให้จูนนอนหลับไม่ฝันแล้วนะครับ</p>
                                        <p className="text-base">แล้วก็ฝากดูแลลูกพี่ด้วยนะชื่อน้องมอมแมม มีหมอนให้น้องไปด้วยใบเล็กง่ะ</p>
                                        <p className="text-xs rotate-180">นอกจากหมอนก็มีพี่นี่แหละครับที่จริงใจ แฮร่</p>
                                    </div>
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
                                        <div>ดูสตอรี่เราหน่อยยยยยจิ ละเปิดเสียงด้วยนะ...</div>
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
            <Transition
                show={showStory}
                className={"bg-black"}
                enter="transition-opacity duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="relative w-screen flex justify-center overflow-y-scroll">
                    <div className="h-screen flex items-center flex-col max-w-md w-full bg-black">
                        <div className="h-[80px] flex justify-between py-[16px] items-center w-full px-4">
                            <div className="flex items-center gap-2">
                                <Avatar src="/img/me.jpeg" className="h-[32px] w-[32px]"></Avatar>
                                <div className="flex items-center gap-2">
                                    <div className="text-white">{meUsername}</div>
                                    <div className="text-gray-100 text-xs">เมื่อสักครู่</div>
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
                                    key={`tab-active-${ind}`}
                                    className={`h-[2px] w-full ${
                                        currentImage > ind ? "bg-white" : currentImage === ind ? "bg-blue-500" : "bg-gray-400"
                                    }`}
                                ></div>
                            ))}
                        </div>
                        <div className="relative w-full h-[85vh]">
                            <div className="absolute z-10 top-[50px] px-2 w-full">
                                {images.map((item, ind) => (
                                    <Transition
                                        key={`message-${ind}`}
                                        show={currentImage === ind}
                                        enter="transition-opacity duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="transition-opacity duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="relative w-full flex justify-center">
                                            <p className="text-center px-2 text-[20px] absolute text-white bg-black opacity-40 rounded-lg">
                                                {images[ind]?.message}
                                            </p>
                                            <p className="text-center px-2 text-[20px] absolute text-white z-10">{images[ind]?.message}</p>
                                        </div>
                                    </Transition>
                                ))}
                            </div>
                            {karaoke.map((item, ind) => {
                                return (
                                    <div
                                        key={`karaoke-${ind}`}
                                        className={`text-center text-white text-[18px] absolute z-10 ${
                                            item.start_at === 51 ? "bottom-[60%]" : "bottom-[2%]"
                                        } px-2 w-full`}
                                    >
                                        <Transition
                                            show={currentMusicSec >= item.start_at && currentMusicSec < item.end_at}
                                            enter="transition-opacity duration-300"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="transition-opacity duration-300"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            {item.eng}
                                            <br />
                                            {item.tha}
                                        </Transition>
                                    </div>
                                );
                            })}
                            <div className="absolute h-full w-full">
                                <div className="w-full h-full relative">
                                    <div className="absolute z-10 flex justify-center w-full h-full ">
                                        <div onClick={() => (isPlaying ? onHold() : onResume())} className="w-[40%] flex items-center justify-center">
                                            {!isPlaying && <PauseOutlined className="text-white text-[50px] bg-black opacity-60 p-2 rounded-md" />}
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => {
                                            if (isPlaying) {
                                                toPrevImage();
                                                mapped.current = {};
                                                setCurrentTime(0);
                                            }
                                        }}
                                        className="absolute z-20 left-0 w-[30%] opacity-20 h-full"
                                    ></div>
                                    <div
                                        onClick={() => {
                                            if (isPlaying) {
                                                toNextImage();
                                                mapped.current = {};
                                                setCurrentTime(0);
                                            }
                                        }}
                                        className="absolute z-20 right-0 w-[30%] opacity-20 h-full"
                                    ></div>
                                    <Image
                                        height={"100%"}
                                        width={"100%"}
                                        className="object-cover absolute"
                                        preview={false}
                                        src={images[currentImage]?.path}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="h-[80px] flex justify-end py-[16px] items-center w-full px-[16px]">
                            <div className="border border-white rounded-2xl text-white py-2 mr-8 w-full px-8">ส่งข้อความ</div>
                            <div className="h-[24px] w-[24px]">{HeartActiveIcon}</div>
                        </div>
                    </div>
                </div>
            </Transition>
        </>
    );
}
