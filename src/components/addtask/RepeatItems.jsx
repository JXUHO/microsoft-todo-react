import {
  BsCalendarDate,
  BsCalendarDay,
  BsCalendarMinus,
  BsCalendar3,
  BsCalendarMonth,
  BsCalendarPlus,
  BsTrash3,
} from "react-icons/bs";

const RepeatItems = ({
  onItemClick,
  getCustomReferenceProps,
  isNeverRepeatShow,
  onNeverRepeatClick,
  onCustomClick,
}) => {
  return (
    <div
      className="bg-white py-1.5 rounded-sm min-w-[200px] max-w-[290px] overflow-auto max-h-[15%] animate-slideFadeDown5 dark:text-[#ffffff]"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.133) 0px 3.2px 7.2px 0px, rgba(0, 0, 0, 0.11) 0px 0.6px 1.8px 0px",
      }}
    >
      <div
        className="font-semibold text-sm px-2 pt-2 pb-3 text-center mb-1.5"
        style={{ borderBottom: "1px solid #edebe9" }}
      >
        Repeat
      </div>
      <ul>
        <li className="text-left min-h-[38px] flex relative items-center font-normal text-sm hover:bg-ms-white-hover">
          <button
            onClick={() => onItemClick("daily")}
            className="py-0 pr-4 pl-3 w-full h-9 cursor-pointer text-left"
          >
            <div className="flex items-center max-w-full">
              <BsCalendarDate
                style={{ marginLeft: "6px", marginRight: "6px" }}
              />
              <span className="px-1">Daily</span>
            </div>
          </button>
        </li>
        <li className="text-left min-h-[38px] flex relative items-center font-normal text-sm hover:bg-ms-white-hover">
          <button
            onClick={() => onItemClick("weekdays")}
            className="py-0 pr-4 pl-3 w-full h-9 cursor-pointer text-left"
          >
            <div className="flex items-center max-w-full">
              <BsCalendarDay
                style={{ marginLeft: "6px", marginRight: "6px" }}
              />
              <span className="px-1">Weekdays</span>
            </div>
          </button>
        </li>
        <li className="text-left min-h-[38px] flex relative items-center font-normal text-sm hover:bg-ms-white-hover">
          <button
            onClick={() => onItemClick("weekly")}
            className="py-0 pr-4 pl-3 w-full h-9 cursor-pointer text-left"
          >
            <div className="flex items-center max-w-full">
              <BsCalendarMinus
                style={{ marginLeft: "6px", marginRight: "6px" }}
              />
              <span className="px-1">Weekly</span>
            </div>
          </button>
        </li>
        <li className="text-left min-h-[38px] flex relative items-center font-normal text-sm hover:bg-ms-white-hover">
          <button
            onClick={() => onItemClick("monthly")}
            className="py-0 pr-4 pl-3 w-full h-9 cursor-pointer text-left"
          >
            <div className="flex items-center max-w-full">
              <BsCalendarMonth
                style={{ marginLeft: "6px", marginRight: "6px" }}
              />
              <span className="px-1">Monthly</span>
            </div>
          </button>
        </li>
        <li className="text-left min-h-[38px] flex relative items-center font-normal text-sm hover:bg-ms-white-hover">
          <button
            onClick={() => onItemClick("yearly")}
            className="py-0 pr-4 pl-3 w-full h-9 cursor-pointer text-left"
          >
            <div className="flex items-center max-w-full">
              <BsCalendar3 style={{ marginLeft: "6px", marginRight: "6px" }} />
              <span className="px-1">Yearly</span>
            </div>
          </button>
        </li>
        <li
          className="mx-0 my-1.5 h-0 p-0 border-none "
          style={{
            borderBottom: "1px solid #edebe9",
            backgroundColor: "#edebe9",
          }}
        />
        <li className="text-left min-h-[38px] flex relative items-center font-normal text-sm hover:bg-ms-white-hover">
          <button
            {...getCustomReferenceProps({
              onClick() {
                onCustomClick();
              },
            })}
            className="py-0 pr-4 pl-3 w-full h-9 cursor-pointer text-left"
          >
            <div className="flex items-center max-w-full">
              <BsCalendarPlus
                style={{ marginLeft: "6px", marginRight: "6px" }}
              />
              <span className="px-1">Custom</span>
            </div>
          </button>
        </li>
        {isNeverRepeatShow && (
          <>
            <li
              className="mx-0 my-1.5 h-0 p-0 border-none "
              style={{
                borderBottom: "1px solid #edebe9",
                backgroundColor: "#edebe9",
              }}
            />
            <li className="text-left min-h-[38px] flex relative items-center font-normal text-sm hover:bg-ms-white-hover">
              <button
                onClick={onNeverRepeatClick}
                className="py-0 pr-4 pl-3 w-full h-9 cursor-pointer text-left"
              >
                <div className="flex items-center max-w-full text-ms-warning">
                  <BsTrash3 style={{ marginLeft: "6px", marginRight: "6px" }} />
                  <span className="px-1">Never Repeat</span>
                </div>
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default RepeatItems;

/**
 * Repeat원리 :
 * complete가 되면 imperative하게 새로운 task를 생성한다(redux에 생성)
 * TaskList에서 redux selector를 통해 정보를 가지고오므로, redux에 새로운 task를 저장하면 된다
 *
 * 공통:
 * repeat을 선택하면 due의 today가 자동으로 활성화된다 - due date가 제거되면 repeat도 자동으로 제거된다
 * 처음 등록할때는 myday에 등록, 이후로는 아님
 *
 * overdue로 설정했을때 weekly만 유일하게 today로 변경됨
 * 미래로 설정됐을 때도 weekly만 유일하게 설정된 미래날짜와 가장 가까운 미래의 오늘요일로 변경됨. 오늘이 17일 일요일이고 27일 수요일로 등록하면 db연결 후 10월1일로 변경된다
 *
 *
 * daily: due 날짜가 today 이후로 지정되면, task 완료 후 그 다음날이 due로 설정된 새로운 task 등록됨. 지난날짜로 설정하면 등록한 즉시 overdue로 표시되며, 완료되면 지정한 지난날짜 다음날의 task가 새로 생성된다. 미래 날짜 daily가 완료되면 그 다음날짜 task가 생성된다
 * weekdays: today 기본설정, 오늘이 주말이면, 등록된 후, 다음주 월요일로 자동으로 이동한다(today -> tomorrow), detaill 탭에서 weekly에 포함된다. overdue로 설정된 task 완료되면 그 다음날짜 overdue task가 생성된다(daily와 동일)
 * weekly:  지난날짜를 설정하면 overdue로 표시되다가 db연결된 후 today, 오늘 기준으로 변경됨. 오늘 이후의 날짜로 설정하면 다음주 오늘과 같은요일로 설정됨
 * monthly: overdue 날짜로 설정하고 완료하면 다음달 동일한 날짜가 생성된다 -> 날짜 기준임
 * yealy: monthly와 동일하게 월/일 기준임.
 *
 *
 *
 *
 *
 *
 *
 *
 * custom 위한 component 만들기 or 찾기
 *
 *
 *
 *
 */
