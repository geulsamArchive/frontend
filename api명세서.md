Login API

로그인 시도시
Post
{
    "id":"",
    "pw":""
}
성공시 get
{
    "status":200,
    "message":"login success",
    "data":{
        "accessToken":키,
        "refreshToken":키
    }
}
실패시 get
{
    "message":"login failed"
}

Author API //없는 애들은 전부 null 리턴

/Author //모든 작가의 이름 요청
get
{
    "user":[...{
        "user_name":"정성훈",
        "user_num":"B811174"
        }]
}

/Author/user_num //개인 위키 페이지
get
{
    "user_name":"정성훈",
    "대표작":{
        "content_name":"얼간이",
        "content_id":""
    },
    //user_num이 같은 content들 종류별로 불러오기
    "content_novel":[...{
        "content_name":"나와 유정",
        "content_id":""
        }],
    "content_poem":[...{
        "content_name":"무진",
        "content_id":""
        }],
    "content_essay":[...{
        "content_name":"빨간글자를보면화가나요",
        "content_id":""
        }],
    "content_other":[...{
        "content_name":"나는컴퓨터가싫어요",
        "content_id":""
        }],
}

/Author/user_num/content_id //작품 페이지

get
{
    "content_name":"다시 한 달을 가서 설산을 넘으면",
    "content_url":"https://naver.com",
    "content_join_time":"20050510",
    "content_clover_url":"https://clovernote.com",
    "content_view":20,
    "critic":{
        "critic_num":"",
        "critic_date":"20231102"
        }, 
        //content_id 같은 댓글 전체 불러오는 배열
    "comment":[...{ 
        "comment_num":"",
        "comment_text":"와 글 개잘썼다",
        "comment_datetime":"20231111",
        "user":{
            "user_num":"",
            "user_name":"정성훈"
        }
    }]
    "award_name":"올해 최고의 글",
    "award_date":"20240110",
}

delete // 작품 삭제시
{
    잘몰라서 나중에 추가할게요
}

Critic API

/Critic //합평 페이지
get
{
    //모든 합평 일자별로 불러오기
    "critic":[...{
        "critic_num":"",
        "critic_date":"20231102"
    }]
}

/Critic/critic_num //합평 세부페이지
get
{
    "critic_num":"",
    "critic_datetime":"20231102",
    "content_id_1":{
        "content_id":"",
        "content_name":"다시 한 달을 가서 설산을 넘으면",
        "user_name":"김연수"
        "content_clover_url":"https://!!!!",
    },
     "content_id_2":{
        "content_id":"",
        "content_name":"",
        "user_name":""
        "content_clover_url":"",
    },
    "critic_user_1":{
        "user":["정성훈","주윤환","이승제","이소현"] 
        // DB에 따로 추가 가능한가? 회원이 아닌 사람이 참가할 수도 있으니 그냥 문자열로 따로 저장하는게 나을 듯
    }
    "critic_user_2":{
        "user":["정성훈","주윤환","이승제","이소현"]
    }
}

Award API

/Award 
get
{
    //수상 날짜불러오기
    "award_date":[..."2023"] //년도만 적힌게 나음
}

/Award/award_date //같은 해 수상된 것들만 모으기
get
{
    "awards":[...{
        "award_name":"이번 작품이 처음이라고? 믿을 수 없어 상"
        "award_explain:"김예린 수상"
    }]
}

Search API

/
{
    잘몰라서 나중에 추가함
}

Admin API

/Admin/account //계정 생성
post
{
    "user_num":"A111113",
    "user_name":"박병길",
    "user_password":"",
    "user_phone":"01012345678",
}

/Admin/account //계정 정보 수정
patch
{
    잘몰룸
}

/Admin/article //소설 등록
post
{
    "content_name":"다시 한 달을 가서 설산을 넘으면",
    "content_url":"https://naver.com",
    "content_join_time":"20050510",
    "content_type":"novel",
    "content_level":"logined",
    "content_clover_url":"https://clovernote.com",
}

/Admin/Critic //합평 등록
post
{
    "critic_datetime":"",
    "critic_user_1":"",
    "critic_user_2":"",
    "content_id_1":"",
    "content_id_2":"",
}

/Admin/award //상 등록
post
{

}


Mypage API

/Mypage //닉네임 전화번호 등 수정
patch
{
 "user_phone":"",   
 "user_nickname":"",   
 "user_nickname_use":"",   
 "대표작":"content_id",   
}

