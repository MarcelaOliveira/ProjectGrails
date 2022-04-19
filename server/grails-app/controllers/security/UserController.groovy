package security

import grails.converters.JSON
import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK
import static org.springframework.http.HttpStatus.BAD_REQUEST

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional

@ReadOnly
class UserController {

    UserService userService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond userService.list(params), model:[userCount: userService.count()]
    }

    def show(Long id) {
        respond userService.get(id)
    }

    @Transactional
    def save( ) {
        params = params.putAll(JSON.parse(request.getReader()) as Map)
        User usu =  User.findByUsername(params.username )
        if (usu == null) {
            try {

               User user = new User(username: params.username, password: params.password, email: params.email, endereco: params.endereco, telefone:  params.telefone, enabled: false,  accountExpired: false, accountLocked: false,
                        passwordExpired: false )
                userService.save(user)
                if (user.hasErrors()) {
                    transactionStatus.setRollbackOnly()
                    respond user.errors
                    return
                }
                if(user.adm == true){

                    Role admin = Role.findByAuthority('ROLE_ADMIN')
                    if( admin == null ){
                        admin = new Role(authority: 'ROLE_ADMIN').save(flush: true)
                    }
                    if(UserRole.findByUserAndRole(user, admin)){
                        new UserRole(user: user, rule: admin).save(flush: true)
                    }
                }else{
                    Role user_comum = Role.findByAuthority('ROLE_USER')
                    if(user == null){
                        user = new Role(authority: 'ROLE_USER').save(flush: true)
                    }
                    if(UserRole.findByUserAndRole(user, user_comum) == null){
                        new UserRole(user: user, rule: user_comum).save(flush: true)
                    }
                }

            } catch (ValidationException e) {
                respond user.errors
                return
            }
        }else{
            respond status: BAD_REQUEST, message: "Usuario já existe"
            return
        }

        respond  user, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(User user) {
        if (user == null) {
            render status: NOT_FOUND
            return
        }
        if (user.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond user.errors
            return
        }

        try {
            userService.save(user)
        } catch (ValidationException e) {
            respond user.errors
            return
        }

        respond user, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null || userService.delete(id) == null) {
            render status: NOT_FOUND
            return
        }

        render status: NO_CONTENT
    }
}
