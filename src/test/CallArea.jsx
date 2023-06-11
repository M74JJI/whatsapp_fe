import { capitalize } from "../../../utils/string";
import CallTimes from "./CallTimes";

export default function CallArea({ name, callAccepted, total, setTotal }) {
  return (
    <div className="absolute top-12 w-full z-40 p-1">
      {/*Container*/}
      <div className="flex flex-col items-center">
        {/*Call infos*/}
        <div className="flex flex-col items-center gap-y-1">
          <h1 className="text-white text-lg">
            <b>{name ? capitalize(name) : ""}</b>
          </h1>
          <CallTimes
            total={total}
            setTotal={setTotal}
            callAccepted={callAccepted}
          />
          {total === 0 && <span className="text-dark_text_1">Ringing...</span>}
        </div>
        {/*Call picture*/}
        {/*
        <div className="mt-10">
          <img src={picture} alt="" className="h-36 w-36 rounded-full " />
        </div>
       */}
      </div>
    </div>
  );
}
