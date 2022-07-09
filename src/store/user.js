import $ from 'jquery';
import jwt_decode from 'jwt-decode';

const moduleUser = {
    state: {
        id: "",
        username: "",
        photo: "",
        followerCount: 0,
        access:"",
        refresh:"",
        is_login: false,
    },
    getters: {
    },
    mutations: {
        updateUser(state, user) {
            state.id = user.id;
            state.username = user.username;
            state.photo = user.photo;
            state.followerCount = user.followerCount;
            state.access = user.access;
            state.refresh = user.refresh;
            state.is_login = true;
        },
        updateAccess(state, access) {
            state.access = access;
        }
    },
    actions: {
        login(context, data) {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/api/token/",
                type: "post",
                data: {
                    username: data.username,
                    password: data.password,
                },
                success(resp) {
                    const {access, refresh} = resp;
                    const access_obj = jwt_decode(access);

                    setInterval(()=>{
                        $.ajax({
                            url: "https://app165.acapp.acwing.com.cn/api/token/refresh/",
                            type: "post",
                            data: {
                                refresh: refresh,
                            },
                            success(resp) {
                                context.commit('updateAccess', resp.access);
                            }
                        })
                    }, 4.5*60*1000);
                    $.ajax({
                        url: "https://app165.acapp.acwing.com.cn/myspace/userlist/",
                        type: "get",
                        data: {
                            user_id: access_obj.user_id,
                        },
                        headers: {
                            'Authorization': 'Bearer ' + access,
                        },
                        success(resp) {
                            context.commit("updateUser", {
                                ...resp,
                                access: access,
                                refresh: refresh,
                                is_login: true,
                            });
                            data.success();
                        },
                    })
                },
                error(){
                    data.error();
                }
            })
        }
    },
    modules: {
    }
}

export default moduleUser;