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
const SEC_PER_IMAGE = 5;

export default function HomePage() {
    const { me: meUsername, her: favUsername } = useContext(ConfigContext);
    const audioRef = useRef(null);
    const videoRef = useRef();

    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentImage, setCurrenImage] = useState(0);
    const [currentMusicSec, setCurrentMusicSec] = useState(0);
    const [showStory, setShowStory] = useState(false);
    const [watched, setWatched] = useState(false);
    const [karaoke, setKaraoke] = useState([]);

    const images = [
        { path: "story/20220731_123613.jpg", message: "สวัสดีคุณลี่ตอนอายุ 19 ขวบนะครับ" },
        { path: "/story/VID_251460812_052621_934.mp4", message: "ยังจำวันแรกที่กลับมาเจอกันได้มั้ยน้า วันนั้นพี่ปล่อยหนูรอเก้อเลย 5555 ติดประชุมแต่ก็อยากเจอมากเหมือนกัน T T" },
        { path: "/story/20221223_170254.jpg", message: "หลังจากวันนั้นก็เริ่มจะมาเจอกันเรื่อยๆ พ้มกลายเป็น 🥸 พ่อคนที่สองซะแนะ" },
        {
            path: "/story/20221223_170740.jpg",
            message: "เมดดรีมอินตึงๆ เลย น่าเสียดายที่ไม่ได้เห็นพี่เนี้ยวๆ สั่งอาหารให้ 5555 วันนั้นกินเสร็จไปต่อที่ AnimateCafe ได้อาเนียด้วยแหละ ได้กันทั้งคู่เลยพกดวงไปเยอะ 🤣",
        },
        {
            path: "/story/3B199E18-DF7F-4A0F-8ADF-F60CEB326AA8.JPG",
            message: "อันนี้ไปกิน Momo อร่อยสมใจ แต่ตอนนั้นได้ยินผิดนึกว่าลี่จะให้สั่งเพิ่ม แทบจะอ้วกเลย น้ำเค็มมากกกสุดดด",
        },
        { path: "/story/cf1b3493f80d4437a8cb7bd72d3e189e.mp4", message: "อยากจะถ่ายลี่แหละแต่พอลี่ยิ้ม น่ารักเขินหันกล้องหนีก่อน เขินนนน" },
        { path: "/story/46bc1a409c15439b9a1dd70464853c8f.mp4", message: "อันนี้ไปเดินเกษตรแฟร์ ลี่เดินจนขาแทบหัก เพราะเดินไปมาแถวสยามอีก เจ้าสิงโตตัวน้อยของผม" },
        { path: "/story/5a35dedd7dda4e27a736b2df9a8fa3ea.mp4", message: "คุณลี่เขาชอบมากะเสื้อตัวโปรดเขาแหละ เท่จังเลย" },
        { path: "/story/c73a52e9b71f4e7e83004e688cc13af6.mp4", message: "" },
        { path: "/story/f9b7c652a2eb40fb8ef8f829699041a5.mp4", message: "งานนี้ได้แต่ถามในใจเมื่อกี้พี่เห็นตูดใช่มั้ย" },
        { path: "/story/black.jpeg", message: "บางเวลาพี่คิดถึงข้อความพวกนี้จัง" },
        { path: "story/Screenshot 2566-09-23 at 21.58.14.png", message: "" },
        { path: "story/Screenshot 2566-09-23 at 22.08.16.png", message: "ส่งการ์ดมาด้วยนะ ยกเว้นว่าการ์ดนั้นจะเป็นชื่อพี่เองอันนี้ไม่ต้องส่ง" },
        { path: "story/20230923_154118000_iOS.jpg", message: "" },
        { path: "story/20230923_153030000_iOS.jpg", message: "" },
        { path: "story/20230923_152800000_iOS.jpg", message: "เขินมากกะรูปตัวเองอันนั้น" },
        { path: "story/20230923_152515000_iOS.jpg", message: "" },
        { path: "story/20230923_152427000_iOS.jpg", message: "" },
        { path: "story/20230923_152116000_iOS.jpg", message: "" },
        { path: "/story/black.jpeg", message: "พาย้อนวัยหน่อยยย" },
        { path: "story/20230923_160537430_iOS.jpg", message: "ซุปเปอร์ปืนใหญ่นีโออาร์มสตรองไซโคลนเจ็ทอาร์มสตรอง" },
        { path: "story/20230923_160540795_iOS.jpg", message: "จริงๆ ลี่เขียนคนเดียวเลยนะ 5555555555" },
        { path: "story/20230923_160533000_iOS.mp4", message: "สู้เขาาาลูกแม่ลี่" },
        { path: "story/20230923_160519000_iOS.mp4", message: "เดอะแบกมากมาย รวมถึงแบกพี่ด้วย" },
        {
            path: "/story/Screenshot_20230305_200856_Instagram.jpg",
            message: "บางครั้งก็แอบคิดว่าถ้าได้เจอกันในช่วงเวลาที่เหมาะสมกว่านี้คงจะดี ยังมีอะไรอีกตั้งหลายอย่างที่อยากทำด้วยกะลี่",
        },
        { path: "/story/IMG_0046.jpg", message: "ขอบคุณมากนะ พี่มีความสุขมากเลย สสวก คุณลี่นะครับ อยากโตไปกะลี่ให้มากกว่านี้จังเลย" },
    ];
    const storyContents = images.map((item, index) => {
        if (!item.path.endsWith("mp4")) return <Image height={"100%"} width={"100%"} className="object-contain absolute" preview={false} src={item?.path} />;
        return (
            <div className="video-container">
                <video ref={videoRef} autoPlay muted>
                    <source width="100%" src={item.path} type="video/mp4" />
                </video>
            </div>
        );
    });

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
                return 0;
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
        const videoElement = videoRef.current;
        audioElement.pause();
        videoElement.pause();
        setIsPlaying(false);
        clearInterval(intervalId.current);
        intervalId.current = null;
    };

    const onResume = () => {
        const audioElement = audioRef.current;
        const videoElement = videoRef.current;
        audioElement.play();
        videoElement.play();
        setIsPlaying(true);
        intervalId.current = intervaltime();
    };

    useEffect(() => {
        const audioElement = audioRef.current;

        const handleEnded = () => {
            audioElement.currentTime = 0;
            audioElement.play();
        };

        audioElement.addEventListener("ended", handleEnded);
        return () => {
            audioElement.removeEventListener("ended", handleEnded);
        };
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
        }
    }, [currentImage]);

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
                                    <div onClick={() => onOpenStory()} className="flex flex-col gap-2 justify-center max-w-[65px] h-full cursor-pointer">
                                        <div className="relative">
                                            {!watched && <div className="absolute bg-gradient-to-tr from-orange-300 to-pink-600 rounded-full h-[60px] w-[60px]"></div>}
                                            {watched && <div className="absolute bg-gray-300 rounded-full h-[60px] w-[60px]"></div>}
                                            <Avatar src="/img/me.jpeg" className="absolute top-[2px] left-[2px] h-[56px] w-[56px] border border-white" />
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
                                                <p className="text-sm">ลาดกระบัง กรุงเทพ</p>
                                            </div>
                                        </div>
                                        <div className="w-[24px] h-[24px]">{TripleDotIcon}</div>
                                    </div>
                                    {/* <Image preview={false} className="max-h-[500px]" src="/img/meme.jpeg" /> */}
                                    <div className="h-[300px] bg-gradient-to-r from-amber-600 to-blue-600 flex flex-col justify-center items-center text-white text-center px-8 gap-4">
                                        <p className="text-xl">ในสตอรี่มีอะไรบางอย่าง ที่ต้องเปิดเสียงด้วย</p>
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
                                        <div>ปีนี้คงไม่มีอะไรพิเศษให้...</div>
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
                                    className={`h-[2px] w-full ${currentImage > ind ? "bg-white" : currentImage === ind ? "bg-blue-500" : "bg-gray-400"}`}
                                ></div>
                            ))}
                        </div>
                        <div className="relative w-full h-[85vh]">
                            <div className="absolute z-10 bottom-[5rem] px-2 w-full">
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
                                            <p className="text-center px-2 text-[16px] absolute text-white bg-black opacity-40 rounded-lg">{images[ind]?.message}</p>
                                            <p className="text-center px-2 text-[16px] absolute text-white z-10">{images[ind]?.message}</p>
                                        </div>
                                    </Transition>
                                ))}
                            </div>
                            {karaoke.map((item, ind) => {
                                return (
                                    <div
                                        key={`karaoke-${ind}`}
                                        className={`text-center text-white text-[18px] absolute z-10 ${item.start_at === 51 ? "bottom-[60%]" : "bottom-[2%]"} px-2 w-full`}
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
                                    {storyContents[currentImage]}
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
