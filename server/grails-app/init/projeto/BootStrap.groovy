package projeto

import grails.gorm.transactions.Transactional
import org.junit.runner.Request

class BootStrap {
    def listUrl = [
            [ url: '/user/show', confgAttibute: 'ROLE_USER' ],
            [ url: '/user/index',  confgAttibute: 'ROLE_ADMIN' ],
            [ url: '/user/save', configAtribute: 'ROLE_ADMIN, ROLE_USER' ],
            [ url: '/user/update/**', configureAtribute: 'ROLE_ADMIN, ROLE_USER' ],
            [ url: '/user/delete/**', configureAtribute: 'ROLE_ADMIN, ROLE_USER' ],
            [ url: '/j_spring_security_switch_user',  configAttribute: 'ROLE_SWITCH_USER,isFullyAuthenticated()' ]
    ]

    def init = {
        addUrls()
    }
    @Transactional
    void addUrls(){
        for( item in listUrl){
            if(Requestmap.findByUrl(item.url) == null){
                new Requestmap(url: item.url, configAttribute: item.configAttribute).save()
            }
        }
    }
    def destroy = {
    }
}
