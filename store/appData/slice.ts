import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppData, PageResponse, PostType } from "../../utility/types";
import {
  getAccountDetailsThunk,
  getAccountInfoThunk,
  getCommentInfoThunk,
  getHashTagDetailsThunk,
  getHashTagInfoThunk,
  getImagePostDetailsThunk,
  getImagePostFeedThunk,
  getVideoPostDetailsThunk,
  getVideoPostFeedThunk,
  getVideoPostInfoThunk,
} from "./reducer";

const appDataIntialState: AppData = {
  screenInfo: {
    imageFeed: { resultMap: {} },
    videoFeed: { resultMap: {} },
    videoPreview: {},
    videoPost: {},
    profile: {
      imagePost: {},
      videoPost: {},
    },
    account: {
      imagePost: {},
      videoPost: {},
    },
    followerFollowing: {
      follower: {},
      following: {},
    },
    hashtag: { imagePost: {}, videoPost: {} },
    hashtagSaves: {},
    tagged: {
      imagePost: {},
      videoPost: {},
    },
    trending: {
      hashTag: { resultMap: {} },
      imagePost: { resultMap: {} },
      videoPost: { resultMap: {} },
    },
    saved: {
      hashTag: {},
      imagePost: {},
      videoPost: {},
    },
    search: {
      account: {},
      hashTag: {},
      imagePost: {},
      videoPost: {},
    },
    postEngagement: {
      comments: {},
      likes: {},
      shares: {},
    },
  },
  userInfo: {
    id: "roybond007",
    profilePictureDataUrl:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gAlUmVzaXplZCBvbiBodHRwczovL2V6Z2lmLmNvbS9yZXNpemX/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCADcAMgDASIAAhEBAxEB/8QAHgAAAAYDAQEAAAAAAAAAAAAAAAQFBgcIAQIDCQr/xABLEAABAwMDAgIGBwMIBwgDAAABAgMEAAURBhIhBzETQQgUIlFhcRUjMkKBkdFSobEJM2JykpPB4RY1RFOCg/AXJENVY6Kj8VRzlP/EABoBAAIDAQEAAAAAAAAAAAAAAAMEAAIFAQb/xAAvEQACAgEEAQQABAYDAQAAAAABAgADEQQSITFBBRMiUTJhcbEjM4GRofAVwfEk/9oADAMBAAIRAxEAPwD0doUKyMedKR2DGaxWTjyoce6pJMUKzx7qxXRJBWjiuQNprekrUF+iaftrtxmvoQhpJX7RwMJGST7gP0Hciuk45MhGeIdfksxWlOvPoaSBklZAAHzNVy61enH0l6WJmQbRIOpbrDyh5qG6BHZX5JW9yCrP3Ugn34qsHpPelPqXXU53TtiuzlssiFqQfAcIdkBPxSeMn/DHnVQ9ZOSJlmYcQ2WYad0heeCrJwjOPPAJpc2u52pDJQijL8/lJx6jfylXX/UVwdd0vc4GmIGfq2YbCVLx8XHASfwxXTph/KSddo8xmBqW+QrskrCcyoraVLJ7ArSARntnyqm1yQvO99W0nBS3jsPjWbcxKEd+ey2AzH25WB9lZPs/wNHFeBkmLm3HAHE9bek/8oxpm+XBqz9RtNqtAcc8FVxiuF1to5xlxB5CR5lJJHfFXJt9xg3aExcrZMZlRJTaXmHmVhaHW1DKVJUOCCDkGvAy36lZcu7MxlW4zkoDyO3t47/PAPPyq9PoRel9pvR9tb6U9Q57kGG7PcTap7726MyFHhlQPLSdxJCslPPO3vUYNWeTxIGDDKieiyRgYNZrhGkIeQkpIO4BQIOQQfMfCu9EBwJ0jdMjvWyeDk81qPjW1cJJ7kAxMn34wDW5KvJP760SMnBrp596qZ2YAOeVfurJGeDQoVCZJqMfZUORWVZPAFZoVWSaBBzyOKFb0Kkk4D5VkgUAPhWakkxt+NYIxW1YIzUkmtCs1iuyQKISCongcmqPenB11kRp46a2KaGlbErnOj7gVkpbGPPb7R/rAd8Vc/UFxat9olSXXAhKG1EqJxtSBlR/AA147dWNcO6t15d9QySFruL70lG/J2tqUdn4BIT+7vQL2OAIehcksYx7w27cbgtbSyhttvwypXBQgjvn3nufwHYUgaj1FGlxnnX0pbtzBTHgx1f+L4Z5cOPu7vz2jHnSvcWpDzca1pklCLi54jqQPrA2Bkk/EjgD3c8UzL7Bn3e5MWq1Ri+/IdSxGjMJySs4CEAeeBgfMmur8OT1I43DAjWDMm/3MMNsvyH3V8IbTt7/AA/WrQ9O/RY1Hf8AQc2PPtb8L1tpLjTjpAw4nJAWkH3Ejd2+HFWK9Ej0Kxo2DH1Pr62MO3OSkLLC05LOecH4+8VcpGjrXGierMRWmkJGE7EAYrP1euc/GnoR/TenLjff2fE8YtX9Hr700unqkqO+4pkgF4IIST29n4eXxpsqDsFp5DrLiQVb8eHkpGBg493evW3qH0f03qgA3W3Nrca4QtBwrHxNU89IvpRH05bJL8S3hPq6VbHGkYOMYycc4+Pke/FW03qXvEV2dymr9KNANlZ4jy9Cb0ypGm5EHpX1FuZkWN5aWLZcnHCo29ROA2snksE4GTyj+r29JI7odSCO2M++vnmt91kW647JCthC8JdA4Pz+FetnoJde/wDtF6fI0Xfrl4l+06hLSPEd3Leh8BCwT9rb9knvgJp1Ca2wZnnDjcO5bKtxwMCuaCCMCug284NMyncyM54710Gcc965pODnFdK4ZIKFChXJIKFChXJIKFChUknKhXTaB24NYKMHIGR7q7JNSCO9YropO7zrUoOeK5JOfyrRxYbTk11KCO/FJtymNx0rWtfstpzgDJz/ANdvjXepJCPpX69VpfpBf5KHzHdlti2xcfa3O8LX8MI3fKvITUmoVLmPOhz2t27aTnA7IHxAA7fCry+nJ1Eev10RouHLSUW1lbklsKJ2uHgJPvI9onHkE5qgWtIi4ElKFAbJe1TSzxgDgE/DBJ/KlVHu2Z8Rv+TVjyYpWS+yXJofddSp+Wj1dlS1ey02o/WK+BIGM1av0GemNl1J1hmawuDCHo2mIqEwwpOU+tO8qX/w84qlliLki6MttnCNwbB/jXoZ6AEjwoV5kpbChIlIZJHYkJKh+WcULXttrMZ9NQPaMy+kFhloo8L3UdKPEBRjvSXFnQoLaEzpjTBODhawD+RrGqdQyrZYZM+xQhNkJSfDCj7IV5EjzxStYTbknE0H3bsARkdXde6D6W20XjXF+agtu7gwwhJckSCByG20+0rHmew8yKr/AHXqhbeqNv3Pej/rx6zuk+FcTCbKVIPG/wAMqCyCPIZpYt/TyyaWny+tPXW9SdWaidWpUGLLPiMQkA5SEN4wSPIAEZIABJ5ZVx9MBzVM+bcdN6Su8i027wQ/IKmG1HxCQlKW1ObirIIKc7h+zQnpqxuqGT95xCVm3q5toPQxkmV99JD0Z7ZYtPu9Sen7cj6Ob9uTHWhSVNJJ5JSRlOPMGm56KXUyR046laauhdKEPTUQpDaSQVMOnaVe7bkjPYZx2zXo1FtkTqBo7xrranEx7pFKX48lvasoUnBCh5Eg1T3oh06v3Tb0hLn02BeTaSpxC1pSnc+wPrI4JUk+yRlKkjhXn2o1GrxU2/kiJanQEXqF4Dcf1nqLBlIkspcb53AH8KOJppaFntyLe20hwKDQCAR7gOP3Yp3JGcCtatgygiYzJ7bFD4myRhWDW9DAznzrOM9qv3KzFCtttDb8arJNaFbbaG2pJNaFZ20Kkk4eLKIyGGv7w/pWPFlecZv8Hf8AKsBu4j/Y4w/5p/StVJuff1GP/fn9KmJzImxfkA8xh+Do/SsGVJHAiJyf/WH6Vpm5jgQGP/6D+lcybpnPqDXBP+0nipO5msiVNCDmInAP++AH8O1Qn1260w+kukJOpLqULnyErTbYbTgJcdx9s+YQnIKlfJI5VUtahuFwgWuTLeiIQ2y0txahJ+ykJJJ/IGvOv0ytS3y4y4YvEINeOjxXUpXu8NsgLaYB8glCk8eaitR7ilr2K8Aw1CbjK66r1jOvUi63e4TFOzZ+4LVu5y4rn8P0qFNTz5N0moZ8UrbYT4DYPZCT2/MA/upy6jlrZg7HnPDdUpTqcqxkJHAHvKio4+ApuW21iZMTJfeACuTjskDuST2GKLSCozLXvuMM21SLTFM1SSt9aS0wkHBSTwVfln8SKs56NGkOq/UXT67bp/XbmidINO4kzGMpkz3RneUFJB2DtnIHHnVanWWbjcGFJT4UZSVFKRySkds1ZbTy9bW/pJp+06UjXBxmeW46nISCVNsb1F4g5wF4zj4n4UPWZRRjGT9w+gVbLCWzjHjzLG6X6R9F9N38+s9YbnftQEI8RT1yxjjACm0qJx35Vk1ZrR91S0HtLTEblpYHhOFW7IHY58/n55qpvo/ejrPYvM272+PMslrn/UphynUvyCx4nieG4oJwRv5JyVK9/fNnriGtL6lskVKfqy2Ym7gY4AHw8qw9SSXDqcz0WmrX29jKB5xOWo9DxNXrjRHZr8KbbXlKYdZcKFBf3VAjkKHcEYpO036MmiLPMRc5kBU6YFFZcke2NxOScHgHk9u+TT0vcK4xbk1KiR1nxhnHYHH/AF3p62OZGuFvbeSo7gMKCu6SO4/Opps2E1t4k1TGtRakbku0sQI+xIHCewqJjpa2s9Zbfq5NtQ7MfhmKlzGClTZUrk/s7Tz58Cprv5SWlBPJqIdcS5Vmtz97iNKect314QnupP2Vjjk+yonHniqMQrbROg7qwzR/aAurEq8XVqI2PDDwUlAUBtCkg45/D86ktDq9oBjrz/XT+tUX9H/rAux+knqrpvJd9eauXq8gLQ4oeHPTGZ8ZCQ4ElKBuCdvkUg8iruNTZikjNplZ/ro/Wt/SbvaAbueU1RU2lh0YfDq//wAVf9tP61sHiODEd/tJ/WiYmS/O1y/7Sf1rPrsgH/Vcv80n/GmIAEHqHfFHlGd/d+tZ8QEfzDv5D9aKeuPng26Xj5CsiS+O1vmD8E1JIYL6AcGM9+Q/Ws+Mj/cu/kP1ov6w6e9vl/2U1gyHPODLH/CmpJDAcTnltz+z/nQosZDh/wBhlf2E0K4SBObhNm32XVbWnlE5wClRwSPd+ldEqfPAfCh/ST2Pu4os4w+xHaUlBeUlO10NjCjzkKTnzH8M0XU4/K2NriPtOOKCQooOxQz9o+75Gu5xOkZikHyBks7sd9igf41zVJZTnIWkfFBoi5KlNq8J+E+h3cMvsp3NqT7/AIfI1q5NkuskMeIHMcKaRvbJ94J+z8Qam6QADqIPUie1H0jdVODY2YUnKlK2n+aVjH/XnXnP6b+pGrPpi1lzb9MTFhx8KHsoUtGAkk99oTtAP7OfvVevrNerFZbRHj6huijHkqU7MecWAAw0nepOOAkFZbHzI5ryp9IzXL/WTqndfGn+p22IpLUFCv5vxAM7l/FR9nPluHlmlW+T8xmobEJEr5dHJDcxKZpc8VlPiLUo5IWrnJ+OMYraLIkKQlJTgSikJIPdOTn8Sofxo/fbDKdfcdKFNeK+GUpIOBtGF/2SBmil5ai2+XCatbxeRHQ2sLwRvI5UceQByM06AABiLNk5jhnORoF1gwpG5AEZTavLYtQ4yPgcVd30I9d2i46ca0tcFN+tW95bWFd8dx/hVCuoN5YnamfkR3ELQNo9g8fZHn547ZqTPR71VO0zfl6miOZbibfX42TudZx9tHvUkAnHuBpbW1e7Xx/SN+m3Ci0E9eZ7OaYMJbKFs4GBSH1YgPC2xrnb4Cpchp0htLaSShZHsqO0E7QrG7APFM7o/wBQLfqGxxpsOUlxt5pK0rCs7gfOnvqDUsWJDelS1KDMVlTyikbjgDngd6829wKGsjmetFeLQ6niNaNaNVa4YgyOpb8JiFblpeDNtnSWkPvJxtLmdi9gPIbJIJxnPanfGvunNMwVNJvkZlDYW44p2SkKyeVKVk8fwqpt86ha/wCpN5cXY5H0FaNy22VSApLpQMjclskYz71YpR0N0otOoL2pl7x9RONkLlTJai40hf7IH2Cfhiimv213OZsf8OBR71jYHePEs+1fWr5BM+FJbkR1+0262oKStJHBB7EfGmlqosO2ae24txKVR3Qotq2qA2HlJ8j7j5GnBHi/RsFEBhGxtlAbAAwMAAAfkKifrTqVi26ZcsjbyRMvy/o6OjcAolz2VnnyCSc+7IpVWw2ZiXAFTjqedFj6hXvT+vLT1ejKfVckXlcx1Lzu9TjW7ZsWr7x8NO0574Pwr2S6WdULX1D0tAvVoLrinW0hbQbypCsZ9onAGfLzPzzXjz1thJs3UJuxtNshLLMX6htIBSgBQVvAHCtycc5PIJPNXz9EjWk6Bpq3Ij+KURGGxcWAc+IgZHiIB++hOMp8wnj2jz6NLc7T9gTyVlPB/KXQjvB/gAggZORjFdRtQojKc9++KTk3KF4SZiJrBTIbQptYcGFIIyFA/HIIrq2tlxHipO9JSTuBBGffkGnc5EWCgQ8lxtRwlQNBS0DsCT7gKTxMZW34kdxpbhw2MKzgk+Y71hxi5IH1kkbT34BSPnwCPnziuZnYdLquw2D45zQ3vEfbT/YpPZMpIcdbK3Q0ratrOVAYB9lXnjP2T3rm/cESW3Y8JiS6spxuZTgJUewVnG01zcB3JFUKdH3kn5jFCiSnG4DgadWEoUMtFSuPigk+Y8vhQq2TK7R9Q34zf+7V+Y/WsF5I52kD5ik0Wu1/+YY/5gofRVrxxclD/mCpmWij4yT2Sf3Ul3J+1txXpkpK0obQVKWgYUce4jzNYXbLdgg3IjI7+KKaHUYQLPp6bOdvZaYiQ5ErcVjG5DRKc+8A8/MCqMdoJnQMkAyhPpR9V5+qdcXJbFxeai29abdaoe/cAlJyt9wH7RK9ygCMADcewzVC6rSxcpsxaVrVMQh1Id53KUAFHJ8+CalbXF9g3TVFzuy4hbaVF8OLk4PhJO3ev3rWQsnzxgeVQRrW9yzOffQjc1GaCRjkZIzj4cZNAqTd8o277RtnO0y3r42LRPuDbaG3XSlx9e0KJASEk+eQBx50nvaUfdTIuVwWhDTZ2MtJOS8se4e5IH/XNNEuSm15dzuHtkZ7HP6fxpw6Uu+Ls0/KZclqb3ewp3YhKcHKlK8hinccZiZ74jflRHFuqSE4Gcnz4+f/AFmpY9H25t2jWS5EllL8d1hLL7KjtSpsnIUo5xhKgg7T9rt2zTWlCJeXWmYJaSlalZLY+1nJ9pXwA7nyFH9LwbrBuv0xYm5CZ7TaY1vbaADjkx9YbYHOAOcnJ7bRVSccyOm5CoOCR3Ll9JepFu6f6rGlzd91quzzztpecT4YdKSkuoSkkkBO8Ec9icdqtba9Yxp7SUlxCyeUKz768q9ZaL6k610hA6hxLXOXcdIiZbdROApZMORHcLiVpCT5tnuMqUsK7jBpzdIvSh6qWliPGuUJF8jpBSl8FSHcDyOAQT+ArC1mhLg3JjPmb3pvqPtqNPZnjoz0ot2gNEXW7evXGxR1l1W5YOdqleeR2qZ7axpuw2NEa3Ro0RpCcIaaSlKR+Arz50z6YslCfDmafnjsNhCdyT8DmjOo/SY6katYNq07HchNO8eJt3O4+AHA+fNZiOacgjP6zct/+pR8uBLOdV+semdE2155+agvKJDLLasuOKx2SKrrouLfeuNy1NrS+QnBNs4j/Q8YSvCbTFKiXEblezu3oQsrOMED+iKT9AdA9fdQro3eNS+tIirUC7JlElSh7hn/AOqnjVejGdI2K3W/SMZpt+E6lxLbhKUScd23SnnaogZPkQDg4risQcmAvrLoVU8ygvpFTdLu9Xott0y2h1y12yLAukxucZKJEw5ccCT2BR4obUQfaWlajgkirj+ibYpBsAnvSpSQ05hSUL2pWoKGQCB5diScZFeeKbdd3NZXePqOGLfczPekzY+zYW1uulSto/ZBUcH3Yr0k9EJiXdtHmK/c1Muwz6q4hKfvJOMgefAzntyDW8VG4BZ5nJVTn7lmdCRYWnpr+nVojoYe3TIaD7RbQo/WNZPdKVklPwXjyFPT6Ms7iytUKPu88Ixn8qYP0LIGo4T8a6vlcNhanyRx9YQEJ/IE/l76frMGfsAF0Ucj9inEP5RNwCeDDJiwVOJeDDfiJ+yrbyK6ubHElKlcEYPxoqIM8H/WSv7FBUK4ntciP+CiiUC85zDDDUeM2GmQlKR5Cum9H7Q5okINxz/rT/46z6ncfO5D+7qS0NLSw4kpcCFpPcKwQfwoUW9VuPYXFP4t0KkqVz5hAr02oYLjGP8A9lY26ZVx4jP99Rk2SORgpTj5VquxxhjKEmpLQk+jTY9lLjB4z/PCoQ9KS8WOL0wukCG7FEmetmG0hyQkJ+sX7YJPb2EryfIZqcJ1niNMKdISnyBI7Z4qjfp46wtMMxNKwlIecip9YfSlOR4iyAEqI+zltKu/JBPvoF3UNSMtKZdWtV2q0hFts8hUlwOKbaWofzgySpwjyBJJSO+CKipou3J925XZZTDSQ4tIO1KlbcJ48+E5/LNGLsuXetSoy5hbhAUskEIBPtn8OfypL1ddFuO+HBbLUQkllHA9kcBSsfewP40aoYWUtYkwtLhRJ8h2RZ47iIrLakIC1AuEhJV2+HHI48qS4MWS41tjDeZDiG9gPKjnjI8xk/u5oxp593dJUkLG5pQJSnnntz88Vva30w3StTCd7ePDIPtIWSCD8/d+NHByYE/LqOqLDjw1Oo8VAOFNBXG1KQR4ih8cjHyzT76bXdVruc66yWH0IeDaY8gBYLa0KAXtKRgq8NRVg+4Z74qMJMxpFlaWtIS884pK/MeGDkJPuyeakjoldrVete2/Ter1RIcSSo+NKkyVMF5QRuQ0pYUlICtqUHP2hlPBUCA3Ju48Qytt5EtFZIkjXVpi6FQZqU6j9Z9TkS9re95zcz468pO7a2tYPKFZKecEioW9F2xM6L6pX3St0cj3RuwXJcKYtlJWy4lDhZ8ZBUPs7wU8jssccUudbPSJtXSxd66Z9FURmLpcG0M3TUEeb62fAdjJS7FaVuUlC0LGN6Sdo4BBzTd9CVPrutL0hSVLbcgKafwNxKVBRBP/ADEoPzxSN6lNOwPXiNaHD6lT5Pc9CB0d0FMSiQ7puAtRAJWlpIz+6nLYumGibY8lyLYIjasjB8IU7rFZswY4Vu3FpOQR54FHnoCoa05ScFQArz/t55InqfdAyoPM0dYaiRkMstjASAABimNqGGZWoIcdaeASo1IwjKefSpRwlPHPkabV+gbLqmaAcpPHwxVrBgQSNtMhzrF6JWjOqTbN2McwL1D/AJi4xgAsozuLTg7ONk+R5HkRSP0b6Vao6WXWfIvtyAjtpQtC2HsBzKvbVtOMJAVjnnt371Z20yWnWQCe4zjPak7WD0W0W1NwRAeljx2m1txyA5sKhuUnPHsgZx54xTOlLqwUHiJaxK2QuRz+8U9KWu3TANl68Z4KU68A4Cvef6OchIBGM+RFO5NmQEpKZkj8Cf1qvDmuE2q+qdiWZU1OdjbiGCSyCfaw7gYyMbgeMnHlTt09qc3JLqY7jzvggHbKUWlKBzggg7scEbsEfvrWrvUHawwTMJqSfkOQJLoswIz67I/f+tZ+h1DtPkD8/wBabljagXqE1IZlLbcWPbYW8d6FeY78/McGlhFgdbOUSHkke51X602rBxkQJBU4MOfRDv8A5g/+ZofRLyefpKQPxNE/oF0nJkvE/F5X60PoJ7sJT/8AfK/WoRjxOQ19HSM4+lJH76FFTZJY7TZH98aFcx+Um4fcVwojtWFLz3rSs0SSImoGrnLiuMRFhlBBBUQCVE+Q93z715qempbYdp1d6s5JKGz6xlptvAUsFtsKWe6jsTuyeOfjXp/IOE7ycYOQfjXnD/KWWyXCvlgvEFlQadivJkLb4BeCtzZ/JB586XvwACYegHccShjUci8sWtH1chwraWo8DCiogE/HNJ93hLfZuC1M7HInhtFvGCFqJG0fLbXO7vOCStgSUh0EPFeeSTz3/IUYs1wcS9cLlKjqeD25srPOxZ+988E/xo6dcQT/AIoVRb5MaztlMXw0SVKUF4AKkp7/AIZHHxpLjMzLw+GGmVLdKQgHGDlOQBn8qcrd+m3G3OWxqGhbbSnAHcYOCB5ny+PJpCaaDFzaXFStctSvEByUJSpJyDjz7UQcHMptxOU9EtCVNLCighKUjPIOBmtZAUFlD+CSASnOfLzpx32SjUl+EmHC8Na0pJbT5rJyQPL7Rxn3AU67Z0jmTtM3fV16kKjMw2VLQhCPaec/ZHuGe5oNuoVDgw9dD2/hkY2+1Sr1cmbVBb3OPrShCce9QH4d6vD/ACamlIkvqfrW3TG9xhW2K9g9iQ8oH8M4qs/RnS12umomI9lgKkzVp2slKR7AQNzrpJGAlP7R4HHnwb+9Oem179HaFpHq1Y7O9dCxEk2rVUKOj66TAfWHkvNJ+8tl7fhJ+0k44JFIazUA/wAIzQ0Okbi5e5dDwC0rxEDCccAVxfcXJW3vbyls7se8+VJ+i9c6a15ZWL3pm5Ny4j6AtKk5Chn7qknlKh2IIBBFLZAB4TikMA9dTRDbT8hzCqYzzgLhUPaJOKLS7MZIIUM58zSuCgDg4rZLqEpG7k/Cq+2rcNJ7rDkRvMaVaaVu8Z9I9wcIFYnpi6fCLrLlSG4sVaVSHiVLKUq9kYA+J/AU5PE3J4Ax2pka51DOt6nbVJ0/In2W5RXWX3oSgqQ08QQEqQrA2kdlZ4wc0fT1VI+4eItq7bLK9p8yMtRiHrTVcfTmkVPyJOze1cxJU2lnKjl0JxtWQhSs7TuORkeYfOitJ2uwWeLboJcWpKPr3HUqC1rzhWSv2zzn7X4cUyend2vlj1fbbfJtEpVoubxbblpQSgBCCpPtc7AFBQKc4IIwSMGprhNJe3yHBlTpKiTz3rlqe2TnBY+R9QelYWEHBwvg/cTVW9DYKktjI7HHajsHVNysxCX90qN2KFH2kj+io/wPFKJZCgUlIP4Ui3aMdh7jP7qVO+k7qziPlatR/DsGZIFuuMS6RETYTocaX+YPmCPIijNRPojUDln1ILY8r/utxV4ZBPCXfun8e35VK6Vbq3tJqhqEz5Hc8/qtMdLZs8eJtQrBOPPFCmcxMjJjb+liByvj51obufJzFGivTXnGQR79qq1xphX/AICB/bqnI7MvCqroFjatQUn3Zqr3plaSX1B0dfG4zYXItTLEhgf02zvUB80qUn8atUImmF4AO3PH84qoXusePfbpM2pKor8xw7Sc5bBIGfyFZ/qFhVVAPmafpVQstYn6nibfIbsfUMhl9spUl5TQ3fd25yCPypNjy5IaeZSFJaW7kpB+8MgH/CrPemV0fOkepk+42i3JZg3tfjskHalLuCF4zwM8H55qt821PxIqEhKUhTe9J/bBJ9r5cU9RZ7tYYRLUUtTaVaLMK8qjxFrSEJZYaKWw2kEkKOVAD9rOMn4DtXBtZQzIuyoyUuuN7WkgnHtf4Ad/f++kyLGkC1ettONeA44ltKQQSFJGMkfHHP4VKPQTp2rqjriLY5aUM2yGoTbg6pYS2zERyvJJAOeB+PFGewImTBIC5wI39PaZu8n6M1JYYch91h8NyW2WtykEDhWPPPu+NXbgdANYdW+n0CDYr7brDpqSwmXLfWjxJr6scoAOEspAGCVEn8KZukuhtmuT8yXokXBclHiSURY61hpDG/cyEKCkqBSgglOSoZ444qwPShPWCLd4Ok71ZQ3YktBTkp+Wp9xtYOBgKSlSgePZUVbeTk8Vh6uwlgRPQaKldhBM5dDfR0sfTOAdO2hlEqfcnEu3SetOVFlJy22M/ZaBGQnguL9sgAJFWhjWuCqMi2lhCmEoDZQRkYAxXO3WeNbWS00lSlKVvccUcqWrzJpUihKFfI0llmbLRpiqrhI1bb0kstj1KnU1gkSbe8pRU+2w5ht8HuFo7K+eAc85p4uv7cpUe9GXXw3GLhH50iuPqfPccmiuBXwsqjNafl4hoySDwc1gPlasZIJrk0nOAaMBg8EIwaoMnicJAg3rT2NNaYqFLuN1dkJft0lLIirVICfDlMA79wByCnbvwcZHPvpyuzYfrSIRfT46wSEfAeZqMtZWvU7us42rJlkeetFvzB2NFC3kx1g+I6hA5WSoI9gkHb2Ge7FamtSxH/kT1Dq7CvP/AL4nLTTEG0zptltypr4m3BCcKIDUdKfaSlJJBIKFZwBxjBzUtR2w22lPuFRpBix3tYwtQvMSYe2OtfgOHaFEJ2BxSc4UoAkbue4FSRCktyUBSTgHkUJ3T3AB9Q2nrf2tzeTD2QBn3UlXbHg5z5UplJIIJ880m3FKi0RjirP+CWr/AByMb/IXBlNy2lYUy6lwH4hWammz6lZnxWn0qBC07sj41CuuEhuO4QMHy/OnN0qh3SZZmwu4sY5Cc7u3kO1d9MsKuyjzAesVjaryUzc21H2iAKFJg0/cx9mWwo/iKFb+ZhZEUvHinvA/+H/KtC/BHBgJ/uaOeIvO0bx8yP1rVTqwcFTn4f8A3UwMyRB1Fc7bbbHPnCE2lbTCyg+GR7ZGE/vIqMdOxdsdtKh7QwT8TTw6rXJZt8KxtuL3THvFcCuPYR2/9xH5UiWuP4TCQByB2rE1tm+7aPE9B6XXspL/AH/1Ka/ylsVmB04s0ttv6+TdgPFAypCG2yo4+ZIqhl8vTEy3wLs6gOLejpSUYxtKcpOPcD3H+VX7/lJkmVZNFW4pBYfkzVKCs7SvY0Bn8CqqF3+ALihHrxbhRk7UpAG5w7eMJQOw8hnAAA707oWAr2j7iPqKk3Fj9RvSL+lyzwrWuIjwYhUpLaQU7io+fvAx8znvirdehHY4epLTqG13e1SxbpG9+U+zhICGUp8JsLThScrUc8EHjzOKrLb9Fv6hucS16ehyXg+UNB15sA7lEDIH3iM/Ljzr1A0B0DsumdNfR/T+PP8AXYVragwy4DEQwvw8vyHHFp+tU6snZwcDJ4AFG1Dq42A/rFKgVO4iOfTFkt9q0a3Fsb++NEWrc3HA+sXjbkhOMqGAMnnNSTZY85VoYVbjCfuKT7a5C1qCXTyUqUnJHBAxj41FnTvTcnT1ulLuM6JHnMpQp14PFxppBKQAoYwpRKgR7RBBST8Za0TcXHb3dWEWVuCzAnrC/AcDilkhPcDscqTnvgDGcild9ZfYBxGALAoYHBipcNTQLJMagX0mIt5ve24WllCvgCAea6Tr7bLVcolsky/rproYaCUKIU4RkIJxwop5APlzXPWs+z3W8R9EXTDTLsR24PSQsJUyEAlO08j7qicjsKbB0jNkSoVzuGq5V0YjqRMhIfbbTtXs2IcUtA3KX4ZHJJGFe+o2mRjiWXVWr3JAnvIMRXhrSQggLVuBCTnHJ7d6SYb8eUpaYsht/wAJakL8NQVtUO6TjsfhTVHUM3GcrSltt7jfiOKYcWts+MSE/WFIHHhjKTknsffinM2kMIcajRPCEk7fDbawFLOMYHfJIGSaodIjHJPUImvsUbQO4qoeZjqWiQfCUhrxVFXkCcAY958hTX1pK6sNx2XNGWW1qS4sBaZT31qRnzBISDj3E4/DkxHQZcl9MbwUpDDclL7+SypGcKSkgk7wRjkcEUIejbbrCd9P3XUE6Q3GVj1dMjDAABBSU+WAOTnnOaNXSidQFmpewcnESrhE1HBmQJL1hiTA8Qh+Q6oFpvPfctBJ8xjHHHY017hbbDpG7DUP+ld/jKE1SmI6mFLRJAOSkJOPF2kkbyexA8s0a191O0HbFpssG4tS/AeShqHBQtxh1IV9gqb7ZOM4yc02tQQmLxDRczDLtxa2pbZYl+14eTsAStWNxG4YOCeRmhvurcnx/vUikOoA7h/qjq52NerfMZuLSnV2OTubQcZcK0KB2gnGMcd/td6k3R85cu2MOKVkKbT+eBVaOozzFzhpnAPw7nbonjtpKT4akJQAplaiBjKUjHHCvgTVjeniArT0FfOVMoVz3yUg4rI1GGuFi+e5v6RitBqYddR7JUSnPc0TuAOwntR1seyMURuawEce6mT+GAA+UivXCh4TqVdwCaOdFYtwUzJCry8lJeWUowSEjPApL104PDWcHIz+NKHRCO34s8iQ+rMhR2hzgZ8sUPQc3znqvFIk0t2+4bfZvTvbzFCu7cdoAfWyRgdt/wDlQr0ewTzXP3NRaLUST4K0H+ssf40DZ7eThCXFH+i8vP8AGsMvOpTh5wHAB8RI+yD2Jz3T5fCk6/6hRZLbKlut/XIQQ2MeyVnhPPxOK4zKoLGWVS7BV7Mj6+rauOrpRYKlMQ8Rm8qKuU/aIJ/pE/lS5CYCGdyh2FINhirS2krO9xR3KV7ye5/PNOUkoZ2pHl3rzykuTYfM9Vt9pFrHiU69MOLq7qUW7Lp3TARb9OPeK9dZP2lrVjKGEYweACVntjHeqS9QtCS9N3D1xkoktIV7YUMgKxz8Pz7kZr1b6iLifRTqZeS2QcgefBqgvWxLRD8aJD2MrXgZHc1ZL3TgdTl2mrsXcRzHR6KumLVqYs67lIS4qHJcjmPkKEZwBAQCe4TtyUj+lVudDzNYXuQ9aYd1cet9tfedeDksrefS4cJRhR+4E5xwkBQ8+KpL6MN/n6JvVxtjbEd1iexvUh10t+KptQKUg9gTuVz5ceVWTalt3C53FvST022yZcFN1TDaSHHIspBUtkKcQcp3bSCRndvTu7g0amwM4Hnz+ky7qyqkjqT9J0e/c2EIt12RBnMseC423sKEpKfqkuIwU+wCSklJzn5VtothjRcV22wpKHUB5xJL4DjrS1Hc5lfBVle5WCBjOMCmXG6qzW9NWLqRBtLUhF1ZW1c4cZKcl5sEAqeVjbtG72VYx25otcx1Iulwn6sslqkMRLpHjqhwkuJS2XVhoKWo43KVnxOcDjntijKESwnHyg23sgGeI+79dNP22fK6iXqcwwI9q9TU8pPsFJVvC1JHKsDakgY4V35pL0l1Ag6uXEjs2t9K2C+gOJbDLaw33UW1HcAkHz4BBPvw0+mt9Rd4kfR/Ui3rmK3OuhS3kur8LAUAtOCt1KTkFaeBhAOSaVIt4skWNeIDJiMtyXVlBlSPBkRjuUC04Tgbcp3FPckZJxmq2XFrAyMCP3kSnbUQ68yQfXI0gKefbejoW006249lKVJTn2wD2wMZIxxjNHtJzXry0u6We7Wqe2ysteNHfLiUqwCpJwMb+ewOBkd8YqHm9HpuGpHrLa48+9xm5CxKXKnJeZaTtQjaFIJUlK0bzuyM5xjgGn1a9W3jTDlu01ctDGwW5x0R4aYyUOJXz2xnA8s4B75J5o1V/BLjAH/cDbTggIc5indpcy1IlzrZb4GG/E8FkvpSuadmU5Ur7JKyQSeBg5xSVo/Vtuuk71ZtDMWUzH8VDcVpxtktq9kltTnLiQUlO/scZHBFL1ys8WKwv6QiocSlOze8NyCFeWVe/wB3wpBs2lbDpl92TZIXiPSSlpXiOlxezOQlBWTtHPbtRVr2sWzkQRfKhQOZ01Dd9CaPs0q/s26ywb+tPhsyW4fiuBS+ziw2klIyeSBTBu7raBF1ZH9RbDkcTGnSlsrfUlBKUFxQ3hsLKlZ4OMg88Vv1zmMQbY3Fvk1uMxMHq4VuQdqTy5sHGVhORkH73B4pqa9luaekw4MVpli3ymNtte370KaSlOxLaU8nAwSe2DnzzS9lhtsKDofvGFQVVq/k/tDmo3dOal0a8XbhHE36OdaeluL2BTi2yd/iYO07lEYPIA9wqYekk43LRVonKSEqehsrIBBwdgzyO/Oeaqbr2TItugZcyA7vEf2i86hTiCtXKFLbSRk8p2g5AGMjBFWs6PW1dm0LZLW5JdfXGhMocedJUtxe0FS1E9yVEk/Osy3L2DdNjTgCpiPMkQZwM96TbsrY2pWOAO9HwpWOPLvSVel4ZII4xR3yBJUNzYkT62V4qVY57106ITbsu5XVluNHUymSoIUp0pOB8hWmrUAJWUnyNa9Cbi0Lzc43ithQkuEDPOArBJHfHxoXp/8ANnPVgBUJPaFXgJAMOOR8JCv0oUaQ+tISnODjIBTu4+GO9CvSbc85nl9q/U0lQ0SgNxWhScgKQcEA9x8R8DUc9QHkIucHTzDzi0R0+supUrOwnhAyee2TyfMUtOdTILTK3vWba74aSvY3JUVqx5AY71HUe4ybxd5N2nfz0p0rPPCR5JHwAAH4Vm+oXKF9sdmbHpWnZrTaw4H7x6WhkBAO3gcZo1LWUJAJ4Ga5W8hLQ2nvya5XGTtQc8Y4pEcLNgLlsxpawbiyIaxIAKeSQe1Uk60eoXfU7Vgt6204XuVhJVznAGBVnurmtWrNbZB3pCtpCQTyT8KgboZoBGsuqSb/AKgfckMIcMhTafZ7Hge15UNRuYLJqbParjs0r0Mb0lo9vUU+ZKguylMtiSykh1Li1YbOR9kBRzk8AgE9hSzpGPDs99iyYvqbTza2o9yadlKS44t5vDa8hWw5IJKlKJ3KIGM5qyup46rxo27afswehyZsF2NHfVsUhpSk4SSArJGcZA8qqMm3aihvsi8WNwi2q9Xkx5AJ+ryEJ3OYCFqICVBOTjJODTF6Ch1KzJosa9GDf2jr1hedRzUT9Mv6TtVukzZYSpcRlYU+4hCnUrAHDhWFDjvjnnsJB05rm93Jdls0mPcNO2m3RmI3rbkRLTipG0NgqU8QlGTkICQo+17xwzp+utUWiwQrsi2q9djuKgSkPFO2OUhJQ4pY5S24k7dyTkHandRVqyXPq1Y4s1MF9nYWor5uLy3VKV7St4cIO0gOlPtDaRt8wRXV1BXIXnPP+/cq1OSCeOMR1T7JprV16vttsFzXbhaShtd7Le+SqSVHfHQQRvbJSpR4zuCiCMmiWnun7zt2cgyrnFvXrqErEuXELTiCVKTk4ytShjJJOMcA+RTbzoe5223vomOOiRFYIet5nLVDaQjchopcG1IXkhRHGAQTu7BF03qe32OEuZcLqtyTHhGCpwSgtCgAl1ZGFdge2eVKKuDzXLLa0bYy4zzx+xlkrsI9wHOOMd/1EsHaLzC0rd0aNtUIvptzPrLshIW2kLdJG1fJDij9rHAHGMcCmZqnqNMsOplRr7ZVTUJaXIiOsp+sQQfthayEp8/vA5HAOeIb0TrtAvzcuLfAGHXPGaUpp5xxxBbBQlxLZWpQwCtWU/eAB9mnrqjVuntUSkWGySI7NsDBefVIYKVLfdXjZh3GMEJIPnvII4FXqv8AeTcF+IPjzB21mttpPyI/tH0zqBeqHbffkyGv9H0YdU9LSWiULIy2Nx2qWlSE7VEAg/tA04r6u5v3OO7adWh+3tOJbVHaYYUh0kHOVpwfvDOPdniojVrzT03SS7ZOvUeGiIkR5ZRFwttOAGiGhhCkKIxhJHcYx3pNv85hiCxe9G31cm1KbcZuako8LY+tCg0hLedqUnce3JOcnir12D3Sq+eeTKWJioMexxwI4OuOpNP33TjOlbRcZMu4Gf4TRZS3lakIPIcX7AQFqQMkgHBycDNQm71IvtzTC00HnPoi3R2BFacSlSkqUS2cYzhCsgBIVlRPHACg6bzo52HFswdiQ5cJcOLFiMISl1a3ZCC6SMHhACgCo49mmxb5UW23GZZZ9viWxlCGnZchhaW1NOeGQjCVDaQE5Vu8iewxS1zktt6A/wAxnToNu7GSf8CHNT9TtOO6EuOmrQ2olDK1ynHWiSZHiAkrxjvjsOMEDyq4+hhus8XvgNJx5eVUOtVw6azxHt9qbkMzEzUoRJcLiRKVjO1Hlt7DBznIxV9dHI8G2RmvINgD8qBZnepJ58x7TkFGUDA8R3IPsgHvSLff5sgqxSwhYS3uV386Qr2rchWQRV7WykvUPmMSLtWKwFA5pO6Ctuyp93dQW23kzXHGFpycKC1d/gexHuJo5rB5PvHf/GuXo6vwnXJjoltlTjy1EBQ81E1z08Ztg/WP5cnZudLKdqrZKQhPJ2pB8NX9HHKh8vyoUrR1xi2CHR/aFCvRgNjueXkN651K1e7qq2wigw4KykqTj613sVZ8wOw/E0jWyQhuWWgoZFayrcqEhx1CMkpA493v/CkSwSR/pC4l7IxjcT5815e2xnsNjdme201C01hE6EleG8UxwUnJ8xSTqCeWGFrJ7A0fjSGwyAF84zmo+6oaiatFllPl0DYgnv8AA0RmO2TaA0q7151Y7fNQpsMN0qQhW5zae/PAqwnos9IoUDTw1FfLWy+9MH1KX2wraj34NV36R6Ok9TOoqHXkLU06/wCK4SMgIB7flXojZLYxabexCitpQ0w2EISBwABWhoNOGO8zA9Q1BJKjzOJ0npgI50/bxxniOkVDV+hTLHqW522BDeTFRJ8VlMWQoBAVhwewM7Tz5VPoSFDviov6x21i2wf9LIdmhS5jbrLTxklwAMklO4bFA5BI+GKb1VO5MrxiIadjv295jJanSFrKpUO4SUFBSsOgrGCORz5cjinLbXIyIaYamJjCEkqSnwU7faPu/D9wpMsSmZzQkiHHZ3/dadd9kHvyVHJ/CndbILgUC3cZXJ3BPi5Gce4isxGBPDTTap1HyWc0iBJS6QtaFvICHFiOA4QfjyQcY5+dJv8A2d9PVOetrsEQqccCyVNKypYAAJ8ycZ5/XFPuLaZJVtTNGw8ELQCe2OTn3E/nRtdmkqCt62FBX/pDnvyeO/JpnazdnMWAKxqMWrT1uYdjQLJbYXjsllTkSKllzbjjDiU5yOfyprTulvTs2+RFRZlB58lwyGpH1oWOQUlfyPBGOc1JxtEo7j4UZSj3BRgEfl8TRd6zSlDCoDPfKlJJHPHbn4Vwbh1ObcnkSG9Z9O0z7LEt+n5keO7ALSA+tG115pBACXSgbXFJxlKiMggfOkmy6FTZY0hmdNiuLkOiQ4fDc/nAe/JIx7eMd+eSeKmCfYpBQpJt+89/t4B/f+fzNM3UNratjL0uUyY7LfJIfScd8+yOTn4c8UsxZX34B/39YdU3jbI7e0UFXAzod/2JaQow4yWS220rBBX9r2s5OTwccdhSLbejIbkSbtdNUz5cuQVSHlQm0oU48o8qKyTjAHHsgDAxntUnRNNz7ghEmCiUttYB3JcynaexwP4YFZf0gopJkNPqQMJCVv47jjPBNLEeWX944C34VMiF/QukNKfRsdmyJSV3KO0yh+5eIvxXHEp3YCQVKwRx29n51bLTxCIrQ7nAqs+pdFPy9X6YkLjMsMWy7MzVhpS8uKQkhIUTgYBOfs88c8VZKwOEsoAPAAqjWguMRvT0ulZ3COdRGwg+6kC/vBLKjnAHelvKVN96bGo5CUNrT7x2olzArC0oN0iHXM0ttvug+y22tYPyBP8AhTN9HOwXmcouJu0VrcATvg+J35xneKVepUzwbLc3QrlEZwD5kbf8aVvRqj7I5V5YGDRfT1BaI+sMAcCTdF0he9viG929RxwDbcD9yyaFOmMrCRnyFCvQe2s81k+ZGE5jxGiEpzx5UypkQxLiZUYDdgApHY0/HyUt8eVNe5KwonAzk15ccDM9sHK8CZTqNUGJlxWAkZ2ngj/KoC6466duMX6Hjucyl7eD93zP+H41IGrZ8lEVZSoDj3VX50m765camnclp8MoA8kgj9TVkBYymqs9uviWc9EvQabVY3dQyWMOSzsbJH3RVkUI2jAps9PLbDtml7fGhtBDaWE4H4U6u1ek06CtABPIXOXcmAcCkPWNnF90/PtRSCZUdbac/tY9n/3AGlytHvsH5UUgFSDBqxUgiV20XNcEcNOJ2ryQpJ8lDgj8808ItyUy6ElZ5479qbUxhqDru+xIydjSJylJT7twSo/vUaUJ3suNrScEjJrzFg2Ej6nrqzvUEyRLVdlLAC1e6nSwmStpxaWF7WkpWs4+yD2J+dRlYnlrbBUc4p5W6S8pO0uHCgAee4olNmBzFrqzn4xX8U1qqQQCd1ccn31zd8qszEdSqqDCtymKCFYyPxqLtU2528XFltaiptLgWoe8A1I01AWjCs85pEWw2XScc5rO1GWJyZpabCcCdWIzQYSAUpJT7hXJyAxnct7n30UmPuMObG8BJGcUj6jvM2BZpEtgo8RttRTuGRmlgvgxv8PMQdaXawWOVFM6e22/IlNsMBagCtwqACQPM1Iml5YkIbKfdURGx29tiTqV9oy7oUhpMmThamkqHIbGMI7keyB8akjpmpT1vbccJKiBR1r9sgQC6gagNgdSQyQhrPkBTE1bOSEL8iKe00lMcke6ok14+6leAs454q+ofbgS2mUE8yHurFzH0LJaC8eO800MH3ryf3JNSV6OkZSbcXMd8VB3VCQ6o29on2VzFEj34QcfxNWE9H5tKbI2QOT+lafpy8Azz/q7brCPqTkx2IoVq2cEUK3phz//2Q==",
    shutterConfiguration: [
      "ImageFeedScreen",
      "VideoFeedScreen",
      "ProfileScreen",
      "TrendingScreen",
      "NotificationScreen",
      "SavedScreen",
      "SettingsScreen",
    ],
    authToken: "",
    refreshToken: "",
  },
};

const appDataSlice = createSlice({
  initialState: appDataIntialState,
  name: "appData",
  reducers: {
    switchSelectedKeyWordSuggestion: {
      prepare: (keyword: string, postType: PostType) => {
        return { payload: { keyword, postType } };
      },
      reducer: (
        state,
        {
          payload: { keyword, postType },
        }: PayloadAction<{ keyword: string; postType: PostType }>
      ) => {
        if (postType === "imagePost") {
          state.screenInfo.imageFeed.selectedKeyword = keyword;
        } else {
          state.screenInfo.videoFeed.selectedKeyword = keyword;
        }
      },
    },
    restoreVideoPost: (state) => {
      state.screenInfo.videoPost.state = undefined;
      state.screenInfo.videoPost.error = undefined;
    },
    restoreVideoPreview: (state) => {
      state.screenInfo.videoPreview.state = undefined;
      state.screenInfo.videoPreview.error = undefined;
    },
    changeSearchPhase: {
      prepare: (text: string) => {
        const filteredText = text.trim();
        return { payload: filteredText };
      },
      reducer: (state, { payload }: PayloadAction<string>) => {
        if (payload.length > 0) {
          state.screenInfo.search.searchPhase = payload;
          state.screenInfo.search.hashTag.hasNewSearchPhase = true;
          state.screenInfo.search.account.hasNewSearchPhase = true;
          state.screenInfo.search.imagePost.hasNewSearchPhase = true;
          state.screenInfo.search.videoPost.hasNewSearchPhase = true;
        }
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getVideoPostInfoThunk.pending,
        (
          state,
          {
            meta: {
              arg: { category, filter },
            },
          }
        ) => {
          switch (category) {
            case "feed":
              state.screenInfo.videoFeed.resultMap[filter].state = "loading";
              break;
            case "hashtag/uploads":
              state.screenInfo.hashtag.videoPost.state = "loading";
              break;
            case "save":
              state.screenInfo.saved.videoPost.state = "loading";
              break;
            case "search":
              state.screenInfo.search.videoPost.state = "loading";
              break;
            case "tag":
              state.screenInfo.tagged.videoPost.state = "loading";
              break;
            case "trend":
              state.screenInfo.trending.videoPost.resultMap[filter].state =
                "loading";
              break;
            case "user/uploads":
              const userId = state.userInfo.id;
              if (userId === filter) {
                state.screenInfo.profile.videoPost.state = "loading";
              } else {
                state.screenInfo.account.videoPost.state = "loading";
              }
              break;
          }
        }
      )
      .addCase(
        getVideoPostInfoThunk.rejected,
        (
          state,
          {
            payload,
            meta: {
              arg: { category, filter },
            },
          }
        ) => {
          switch (category) {
            case "feed":
              state.screenInfo.videoFeed.resultMap[filter].state = "failure";
              state.screenInfo.videoFeed.error = payload;
              break;
            case "hashtag/uploads":
              state.screenInfo.hashtag.videoPost.state = "failure";
              state.screenInfo.hashtag.error = payload;
              break;
            case "save":
              state.screenInfo.saved.videoPost.state = "failure";
              state.screenInfo.saved.error = payload;
              break;
            case "search":
              state.screenInfo.search.videoPost.state = "failure";
              state.screenInfo.search.error = payload;
              break;
            case "tag":
              state.screenInfo.tagged.videoPost.state = "failure";
              state.screenInfo.tagged.error = payload;
              break;
            case "trend":
              state.screenInfo.trending.videoPost.resultMap[filter].state =
                "failure";
              state.screenInfo.trending.error = payload;
              break;
            case "user/uploads":
              const userId = state.userInfo.id;
              if (userId === filter) {
                state.screenInfo.profile.videoPost.state = "failure";
                state.screenInfo.profile.error = payload;
              } else {
                state.screenInfo.account.videoPost.state = "failure";
                state.screenInfo.account.error = payload;
              }
              break;
          }
        }
      )
      .addCase(
        getVideoPostInfoThunk.fulfilled,
        (
          state,
          {
            payload: { category, filter, recentTimestamp, list, ...page },
            meta: {
              arg: { initialRequest },
            },
          }
        ) => {
          const idList: string[] = [];
          list?.forEach((videoPost) => {
            idList.push(videoPost.id);
          });

          switch (category) {
            case "feed":
              state.screenInfo.videoFeed.resultMap[filter].state = "success";
              state.screenInfo.videoFeed.recentTimestamp = recentTimestamp;
              state.screenInfo.videoFeed.resultMap[filter].page = page;
              if (initialRequest) {
                state.screenInfo.videoFeed.resultMap[filter].ids = idList;
              } else {
                state.screenInfo.videoFeed.resultMap[filter].ids?.push(
                  ...idList
                );
              }
              break;
            case "hashtag/uploads":
              state.screenInfo.hashtag.videoPost.state = "success";
              break;
            case "save":
              state.screenInfo.saved.videoPost.state = "success";
              state.screenInfo.saved.videoPost.recentTimestamp =
                recentTimestamp;
              state.screenInfo.saved.videoPost.page = page;
              if (initialRequest) {
                state.screenInfo.saved.videoPost.ids = idList;
              } else {
                state.screenInfo.saved.videoPost.ids?.push(...idList);
              }
              break;
            case "search":
              state.screenInfo.search.videoPost.state = "success";
              state.screenInfo.search.videoPost.recentTimestamp =
                recentTimestamp;
              state.screenInfo.search.videoPost.page = page;
              if (initialRequest) {
                state.screenInfo.search.videoPost.ids = idList;
              } else {
                state.screenInfo.search.videoPost.ids?.push(...idList);
              }
              break;
            case "tag":
              state.screenInfo.tagged.videoPost.state = "success";
              break;
            case "trend":
              state.screenInfo.trending.videoPost.resultMap[filter].state =
                "success";
              state.screenInfo.trending.videoPost.recentTimestamp =
                recentTimestamp;
              state.screenInfo.trending.videoPost.resultMap[filter].page = page;
              if (initialRequest) {
                state.screenInfo.trending.videoPost.resultMap[filter].ids =
                  idList;
              } else {
                state.screenInfo.trending.videoPost.resultMap[filter].ids?.push(
                  ...idList
                );
              }
              break;
            case "user/uploads":
              const userId = state.userInfo.id;
              if (userId === filter) {
                state.screenInfo.profile.videoPost.state = "success";
              } else {
                state.screenInfo.account.videoPost.state = "success";
              }
              break;
          }
        }
      )
      .addCase(
        getImagePostDetailsThunk.pending,
        (
          state,
          {
            meta: {
              arg: { category, filter },
            },
          }
        ) => {
          switch (category) {
            case "feed":
              state.screenInfo.imageFeed.resultMap[filter].state = "loading";
              break;
            case "hashtag/uploads":
              state.screenInfo.hashtag.imagePost.state = "loading";
              break;
            case "save":
              state.screenInfo.saved.imagePost.state = "loading";
              break;
            case "search":
              state.screenInfo.search.imagePost.state = "loading";
              break;
            case "tag":
              state.screenInfo.tagged.imagePost.state = "loading";
              break;
            case "trend":
              state.screenInfo.trending.imagePost.resultMap[filter].state =
                "loading";
              break;
            case "user/uploads":
              const userId = state.userInfo.id;
              if (userId === filter) {
                state.screenInfo.profile.imagePost.state = "loading";
              } else {
                state.screenInfo.account.imagePost.state = "loading";
              }
              break;
          }
        }
      )
      .addCase(
        getImagePostDetailsThunk.rejected,
        (
          state,
          {
            payload,
            meta: {
              arg: { category, filter },
            },
          }
        ) => {
          switch (category) {
            case "feed":
              state.screenInfo.imageFeed.resultMap[filter].state = "failure";
              state.screenInfo.imageFeed.error = payload;
              break;
            case "hashtag/uploads":
              state.screenInfo.hashtag.imagePost.state = "failure";
              state.screenInfo.hashtag.error = payload;
              break;
            case "save":
              state.screenInfo.saved.imagePost.state = "failure";
              state.screenInfo.saved.error = payload;
              break;
            case "search":
              state.screenInfo.search.imagePost.state = "failure";
              state.screenInfo.search.error = payload;
              break;
            case "tag":
              state.screenInfo.tagged.imagePost.state = "failure";
              state.screenInfo.tagged.error = payload;
              break;
            case "trend":
              state.screenInfo.trending.imagePost.resultMap[filter].state =
                "failure";
              state.screenInfo.trending.error = payload;
              break;
            case "user/uploads":
              const userId = state.userInfo.id;
              if (userId === filter) {
                state.screenInfo.profile.imagePost.state = "failure";
                state.screenInfo.profile.error = payload;
              } else {
                state.screenInfo.account.imagePost.state = "failure";
                state.screenInfo.account.error = payload;
              }
              break;
          }
        }
      )
      .addCase(
        getImagePostDetailsThunk.fulfilled,
        (
          state,
          {
            payload: { category, filter, recentTimestamp, list, ...page },
            meta: {
              arg: { initialRequest },
            },
          }
        ) => {
          const idList: string[] = [];
          list?.forEach((imagePost) => {
            idList.push(imagePost.id);
          });
          switch (category) {
            case "feed":
              state.screenInfo.imageFeed.resultMap[filter].state = "success";
              state.screenInfo.imageFeed.recentTimestamp = recentTimestamp;
              state.screenInfo.imageFeed.resultMap[filter].page = page;
              if (initialRequest) {
                state.screenInfo.imageFeed.resultMap[filter].ids = idList;
              } else {
                state.screenInfo.imageFeed.resultMap[filter].ids?.push(
                  ...idList
                );
              }
              break;
            case "hashtag/uploads":
              state.screenInfo.hashtag.imagePost.state = "success";
              break;
            case "save":
              state.screenInfo.saved.imagePost.state = "success";
              state.screenInfo.saved.imagePost.recentTimestamp =
                recentTimestamp;
              state.screenInfo.saved.imagePost.page = page;
              if (initialRequest) {
                state.screenInfo.saved.imagePost.ids = idList;
              } else {
                state.screenInfo.saved.imagePost.ids?.push(...idList);
              }
              break;
            case "search":
              state.screenInfo.search.imagePost.state = "success";
              state.screenInfo.search.imagePost.recentTimestamp =
                recentTimestamp;
              state.screenInfo.search.imagePost.page = page;

              if (initialRequest) {
                state.screenInfo.search.imagePost.ids = idList;
              } else {
                state.screenInfo.search.imagePost.ids?.push(...idList);
              }
              break;
            case "tag":
              state.screenInfo.tagged.imagePost.state = "success";
              break;
            case "trend":
              state.screenInfo.trending.imagePost.resultMap[filter].state =
                "success";
              state.screenInfo.trending.imagePost.recentTimestamp =
                recentTimestamp;
              state.screenInfo.trending.imagePost.resultMap[filter].page = page;

              if (initialRequest) {
                state.screenInfo.trending.imagePost.resultMap[filter].ids =
                  idList;
              } else {
                state.screenInfo.trending.imagePost.resultMap[filter].ids?.push(
                  ...idList
                );
              }
              break;
            case "user/uploads":
              const userId = state.userInfo.id;
              if (userId === filter) {
                state.screenInfo.profile.imagePost.state = "success";
              } else {
                state.screenInfo.account.imagePost.state = "success";
              }
              break;
          }
        }
      )
      .addCase(
        getHashTagInfoThunk.pending,
        (
          state,
          {
            meta: {
              arg: { category, filter },
            },
          }
        ) => {
          switch (category) {
            case "save":
              state.screenInfo.saved.hashTag.state = "loading";
              break;
            case "search":
              state.screenInfo.search.hashTag.state = "loading";
              break;
            case "trend":
              state.screenInfo.trending.hashTag.resultMap[filter].state =
                "loading";
              break;
          }
        }
      )
      .addCase(
        getHashTagInfoThunk.rejected,
        (
          state,
          {
            meta: {
              arg: { category, filter },
            },
            payload,
          }
        ) => {
          switch (category) {
            case "save":
              state.screenInfo.saved.hashTag.state = "failure";
              state.screenInfo.saved.error = payload;
              break;
            case "search":
              state.screenInfo.search.hashTag.state = "failure";
              state.screenInfo.search.error = payload;
              break;
            case "trend":
              state.screenInfo.trending.hashTag.resultMap[filter].state =
                "failure";
              state.screenInfo.trending.error = payload;
              break;
          }
        }
      )
      .addCase(
        getHashTagInfoThunk.fulfilled,
        (
          state,
          {
            payload: { category, filter, recentTimestamp, list, ...page },
            meta: {
              arg: { initialRequest },
            },
          }
        ) => {
          const idList: string[] = [];
          list?.forEach((hashtag) => idList.push(hashtag.id));
          switch (category) {
            case "save":
              state.screenInfo.saved.hashTag.state = "success";
              state.screenInfo.saved.hashTag.recentTimestamp = recentTimestamp;
              if (initialRequest) {
                state.screenInfo.saved.hashTag.ids = idList;
              } else {
                state.screenInfo.saved.hashTag.ids?.push(...idList);
              }
              break;
            case "search":
              state.screenInfo.search.hashTag.state = "success";
              state.screenInfo.search.hashTag.recentTimestamp = recentTimestamp;
              state.screenInfo.search.hashTag.page = page;
              if (initialRequest) {
                state.screenInfo.search.hashTag.ids = idList;
              } else {
                state.screenInfo.search.hashTag.ids?.push(...idList);
              }
              break;
            case "trend":
              state.screenInfo.trending.hashTag.resultMap[filter].state =
                "success";
              state.screenInfo.trending.hashTag.recentTimestamp =
                recentTimestamp;
              state.screenInfo.trending.hashTag.resultMap[filter].page = page;
              if (initialRequest) {
                state.screenInfo.trending.hashTag.resultMap[filter].ids =
                  idList;
              } else {
                state.screenInfo.trending.hashTag.resultMap[filter].ids?.push(
                  ...idList
                );
              }
              break;
          }
        }
      )
      .addCase(
        getAccountInfoThunk.pending,
        (
          state,
          {
            meta: {
              arg: { category },
            },
          }
        ) => {
          switch (category) {
            case "search":
              state.screenInfo.search.account.state = "loading";
              break;
            case "hashtag/saves":
              state.screenInfo.hashtagSaves.state = "loading";
              break;
            case "user/followers":
              state.screenInfo.followerFollowing.follower.state = "loading";
              break;
            case "user/followings":
              state.screenInfo.followerFollowing.following.state = "loading";
              break;
          }
        }
      )
      .addCase(
        getAccountInfoThunk.rejected,
        (
          state,
          {
            meta: {
              arg: { category, filter },
            },
            payload,
          }
        ) => {
          switch (category) {
            case "search":
              state.screenInfo.search.account.state = "failure";
              state.screenInfo.search.error = payload;
              break;
            case "hashtag/saves":
              state.screenInfo.hashtagSaves.state = "failure";
              state.screenInfo.hashtagSaves.error = payload;
              break;
            case "user/followers":
              state.screenInfo.followerFollowing.follower.state = "failure";
              state.screenInfo.followerFollowing.error = payload;
              break;
            case "user/followings":
              state.screenInfo.followerFollowing.following.state = "failure";
              state.screenInfo.followerFollowing.error = payload;
              break;
          }
        }
      )
      .addCase(
        getAccountInfoThunk.fulfilled,
        (
          state,
          {
            payload: { category, filter, recentTimestamp, list, ...page },
            meta: {
              arg: { initialRequest },
            },
          }
        ) => {
          const idList: string[] = [];
          list?.forEach((account) => idList.push(account.id));
          switch (category) {
            case "search":
              state.screenInfo.search.account.state = "success";
              state.screenInfo.search.account.recentTimestamp = recentTimestamp;
              state.screenInfo.search.account.page = page;
              if (initialRequest) {
                state.screenInfo.search.account.ids = idList;
              } else {
                state.screenInfo.search.account.ids?.push(...idList);
              }
              break;
            case "hashtag/saves":
              state.screenInfo.hashtagSaves.state = "success";
              break;
            case "user/followers":
              state.screenInfo.followerFollowing.follower.state = "success";
              break;
            case "user/followings":
              state.screenInfo.followerFollowing.following.state = "success";
              break;
          }
        }
      )
      .addCase(getVideoPostDetailsThunk.pending, (state) => {
        state.screenInfo.videoPost.state = "loading";
      })
      .addCase(getVideoPostDetailsThunk.rejected, (state, { payload }) => {
        state.screenInfo.videoPost.state = "failure";
        state.screenInfo.videoPost.error = payload;
      })
      .addCase(getVideoPostDetailsThunk.fulfilled, (state, { payload }) => {
        state.screenInfo.videoPost.state = "success";
      })
      .addCase(getHashTagDetailsThunk.pending, (state) => {
        state.screenInfo.hashtag.state = "loading";
      })
      .addCase(getHashTagDetailsThunk.rejected, (state, { payload }) => {
        state.screenInfo.hashtag.state = "failure";
        state.screenInfo.hashtag.error = payload;
      })
      .addCase(getHashTagDetailsThunk.fulfilled, (state) => {
        state.screenInfo.hashtag.state = "success";
      })
      .addCase(
        getAccountDetailsThunk.pending,
        (
          state,
          {
            meta: {
              arg: { id },
            },
          }
        ) => {
          const userId = state.userInfo.id;
          if (userId === id) {
            state.screenInfo.profile.state = "loading";
          } else {
            state.screenInfo.account.state = "loading";
          }
        }
      )
      .addCase(
        getAccountDetailsThunk.rejected,
        (
          state,
          {
            meta: {
              arg: { id },
            },
            payload,
          }
        ) => {
          const userId = state.userInfo.id;
          if (userId === id) {
            state.screenInfo.profile.state = "failure";
            state.screenInfo.profile.error = payload;
          } else {
            state.screenInfo.account.state = "failure";
            state.screenInfo.account.error = payload;
          }
        }
      )
      .addCase(getAccountDetailsThunk.fulfilled, (state, { payload }) => {
        const userId = state.userInfo.id;
        if (userId === payload.id) {
          state.screenInfo.profile.state = "success";
        } else {
          state.screenInfo.account.state = "success";
        }
      })
      .addCase(getVideoPostFeedThunk.pending, (state) => {
        state.screenInfo.videoFeed.state = "loading";
      })
      .addCase(getVideoPostFeedThunk.rejected, (state, { payload }) => {
        state.screenInfo.videoFeed.state = "failure";
        state.screenInfo.videoFeed.error = payload;
      })
      .addCase(
        getVideoPostFeedThunk.fulfilled,
        (state, { payload: { feed, keywords } }) => {
          state.screenInfo.videoFeed.state = "success";
          state.screenInfo.videoFeed.recentTimestamp = feed.recentTimestamp;
          state.screenInfo.videoFeed.keywords = keywords;
          keywords.forEach((keyword) => {
            state.screenInfo.videoFeed.resultMap[keyword] = {};
          });
          state.screenInfo.videoFeed.resultMap[keywords[0]] = {
            page: {
              id: feed.id,
              length: feed.length,
              noOfPages: feed.noOfPages,
              size: feed.size,
            },
            ids: feed.list?.map((videoPost) => videoPost.id),
            state: "success",
          };
          state.screenInfo.videoFeed.selectedKeyword = keywords[0];
        }
      )
      .addCase(getImagePostFeedThunk.pending, (state) => {
        state.screenInfo.imageFeed.state = "loading";
      })
      .addCase(getImagePostFeedThunk.rejected, (state, { payload }) => {
        state.screenInfo.imageFeed.state = "failure";
        state.screenInfo.imageFeed.error = payload;
      })
      .addCase(
        getImagePostFeedThunk.fulfilled,
        (state, { payload: { feed, keywords } }) => {
          state.screenInfo.imageFeed.state = "success";
          state.screenInfo.imageFeed.recentTimestamp = feed.recentTimestamp;
          state.screenInfo.imageFeed.keywords = keywords;
          keywords.forEach((keyword) => {
            state.screenInfo.imageFeed.resultMap[keyword] = {};
          });
          state.screenInfo.imageFeed.resultMap[keywords[0]] = {
            page: {
              id: feed.id,
              length: feed.length,
              noOfPages: feed.noOfPages,
              size: feed.size,
            },
            ids: feed.list?.map((imagePost) => imagePost.id),
            state: "success",
          };
          state.screenInfo.imageFeed.selectedKeyword = keywords[0];
        }
      )
      .addCase(getCommentInfoThunk.pending, (state) => {
        state.screenInfo.postEngagement.comments.state = "loading";
      })
      .addCase(getCommentInfoThunk.rejected, (state) => {
        state.screenInfo.postEngagement.comments.state = "failure";
      })
      .addCase(getCommentInfoThunk.fulfilled, (state) => {
        state.screenInfo.postEngagement.comments.state = "success";
      });
  },
});

export const {
  restoreVideoPost,
  restoreVideoPreview,
  changeSearchPhase,
  switchSelectedKeyWordSuggestion,
} = appDataSlice.actions;

export const appDataReducer = appDataSlice.reducer;
