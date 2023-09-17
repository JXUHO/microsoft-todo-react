

const RepeatItems = () => {




  return (
    <div>
      <div>Repeat</div>
      <ul>
        <li>
          <button onClick={null}>
            <span>Daily</span>
          </button>
        </li>
        <li>
          <button onClick={null}>
            <span>Weekdays</span>
          </button>
        </li>
        <li>
          <button onClick={null}>
            <span>Weekly</span>
          </button>
        </li>
        <li>
          <button onClick={null}>
            <span>Monthly</span>
          </button>
        </li>
        <li>
          <button onClick={null}>
            <span>Yearly</span>
          </button>
        </li>
        <li>----------------</li>
        <li>
          <button onClick={null}>Custom</button>
        </li>
        {null && (
          <li>
            <button onClick={null}>Never repeat</button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default RepeatItems  


/**
 * Repeat원리 : 
 * complete가 되면 imperative하게 새로운 task를 생성한다(redux에 생성)
 * TaskList에서 redux selector를 통해 정보를 가지고오므로, redux에 새로운 task를 저장하면 된다
 * 
 * repeat을 선택하면 due의 today가 자동으로 활성화된다 - due date가 제거되면 repeat도 자동으로 제거된다
 * 
 * daily: due today 기본설정, due 날짜가 today 이후로 지정되면 완료 후 그 다음날이 due로 설정된 task 등록됨. 처음 등록할때는 myday에 등록, 이후로는 아님
 * 
 * 
 * 
 * custom 위한 component 만들기 or 찾기
 * 
 * 
 * 
 * 
 */