import { useSelector } from "react-redux";
import { ChatIcon, CommunityIcon, DotsIcon, StoryIcon } from "../../../svg";
export default function SidebarHeader() {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="h-[50px] dark:bg-dark_bg_2 flex items-center p16">
      {/* container */}
      <div className="w-full flex items-center justify-between">
        {/*user image*/}
        <button className="btn">
          <img
            src={user.picture}
            alt={user.name}
            className="w-full h-full rounded-full object-cover"
          />
        </button>
        {/*user icons*/}
        <ul className="flex items-center gap-x-2 5">
          <li>
            <button className="btn">
              <CommunityIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <StoryIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <ChatIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <DotsIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
