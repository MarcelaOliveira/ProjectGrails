package projeto

import grails.gorm.transactions.Transactional
import security.User
import security.Role
import security.UserRole
import org.junit.runner.Request

class BootStrap {
    def listUrl = [
            [ url: '/User/show', confgAttibute: 'ROLE_USER' ],
            [ url: '/User/index',  confgAttibute: 'ROLE_ADMIN' ],
            [ url: '/User/save', configAtribute: 'permitAll' ],
            [ url: '/User/update/**', configureAtribute: 'ROLE_ADMIN, ROLE_USER' ],
            [ url: '/User/delete/**', configureAtribute: 'ROLE_ADMIN, ROLE_USER' ],
            [ url: '/j_spring_security_switch_user',  configAttribute: 'ROLE_SWITCH_USER,isFullyAuthenticated()' ]
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
        Role adm = Role.findByAuthority('ROLE_ADMIN')
        if( adm == null ){
            adm = new Role(authority: 'ROLE_ADMIN').save(flush: true)
        }

        Role user = Role.findByAuthority('ROLE_USER')
        if(user == null){
            user = new Role(authority: 'ROLE_USER').save(flush: true)
        }

        User admin = User.findByUsername("marcelaAdmin")
        if(admin == null){
            admin = new User(username: "marcelaAdmin", password: "12345678", email: "marcelaAdmin@gmail.com", telefone: "12345678", endereco: "Rua Tal", adm: false,
            enabled: true, accountExpired: false, accountLocked: false,
                    passwordExpired: false).save(flush: true)
        }
        User usu = User.findByUsername("marcelaUser")
        if(usu == null){
            usu = new User(username: "marcelaUser", password: "1234", email: "marcelaUser@gmail.com", telefone: "12345678", endereco: "Rua Tal", adm: false,
                    enabled: true, accountExpired: false, accountLocked: false,
                    passwordExpired: false).save(flush: true)
        }
        if(UserRole.findByUserAndRole(adm, admin) == null){
            new UserRole(user: adm, role: admin).save(flush: true)
        }
        if(UserRole.findByUserAndRole(user, usu) == null){
            new UserRole(user: user, role:usu).save(flush: true)
        }

    }
    def destroy = {
    }
}
