package projeto

import grails.gorm.transactions.Transactional
import security.User
import security.Role
import security.UserRole

class BootStrap {
    def listUrl = [
            [ url: '/api/user/show', configAttribute: 'ROLE_USER' ],
            [ url: '/api/user',  configAttribute: 'ROLE_ADMIN' ],
            [ url: '/api/user/save', configAttribute: 'permitAll'],
            [ url: '/api/user/getUsername', configAttribute: 'ROLE_ADMIN, ROLE_USER' ],
            [ url: '/api/user/update/**',  configAttribute: 'ROLE_ADMIN, ROLE_USER' ],
            [ url: '/api/user/delete/**',  configAttribute: 'ROLE_ADMIN, ROLE_USER' ],
            [ url: '/oauth/access_token',    configAttribute: 'permitAll' ],
            [ url: '/api/login/**', configAttribute: 'permitAll' ],
            [ url: '/api/j_spring_security_switch_user',  configAttribute: 'ROLE_SWITCH_USER,isFullyAuthenticated()' ]
    ]

    def init = {
        addUrls()
        addUsers()
    }
    @Transactional
    void addUrls(){
        for( item in listUrl){
            if(Requestmap.findByUrl(item.url) == null){
                new Requestmap(url: item.url, configAttribute: item.configAttribute).save()
            }
        }
    }
    @Transactional
    void addUsers(){
        Role admin = Role.findByAuthority('ROLE_ADMIN')
        if( admin == null ){
            admin = new Role(authority: 'ROLE_ADMIN').save(flush: true)
        }

        Role user = Role.findByAuthority('ROLE_USER')
        if(user == null){
            user = new Role(authority: 'ROLE_USER').save(flush: true)
        }

        User administrador = User.findByUsername("marcelaAdmin")
        if(administrador == null){
            administrador = new User(username: "marcelaAdmin", password: "12345678", email: "marcelaAdmin@gmail.com", telefone: "12345678", endereco: "Rua Tal",
            enabled: true, accountExpired: false, accountLocked: false,
                    passwordExpired: false).save(flush: true)
        }
        User user_comum = User.findByUsername("marcelaUser")
        if(user_comum == null){
            user_comum = new User(username: "marcelaUser", password: "1234", email: "marcelaUser@gmail.com", telefone: "12345678", endereco: "Rua Tal",
                    enabled: true, accountExpired: false, accountLocked: false,
                    passwordExpired: false).save(flush: true)
        }
        if(UserRole.findByUserAndRole(administrador, admin) == null){
            new UserRole(user: administrador, role: admin).save(flush: true)
        }
        if(UserRole.findByUserAndRole(user_comum, user) == null){
            new UserRole(user: user_comum, role: user).save(flush: true)
        }

    }
    def destroy = {
    }
}
