package projeto

import grails.validation.ValidationException

import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_FOUND

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional

@ReadOnly
class UserController {

    UserService userService

	static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    @Transactional
    def saveUser(User user){
        if(user == null){
            render status: NOT_FOUND
            return
        }
        if(user.hasErrors()){
            transactionStatus.setRollbackOnly()
            respond user.errors
            return
        }
        try{
            userService.save(user)
        }catch (ValidationException e){
            respond user.errors
            return
        }

        respond user, [status: CREATED, viw: "Usuario salvo"]
    }

	
    def index() { }
}
