package bankingsystem.backend.service;

import bankingsystem.backend.config.JwtTokenUtil;
import bankingsystem.backend.dao.AccountRepository;
import bankingsystem.backend.dao.UserRepository;
import bankingsystem.backend.dto.Constants;
import bankingsystem.backend.dto.UserDetails;
import bankingsystem.backend.entity.Account;
import bankingsystem.backend.entity.User;
import bankingsystem.backend.exception.BadRequestException;

import java.util.Date;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    TransactionService transactionService;

    @Autowired
    private UserRepository userRepository;

    private final Logger logger = LogManager.getLogger(getClass());

    public String createAccount(UserDetails details) {
        //Account account = new Account();
        //account.setAccountNo(user.getContactNo());
        

        if (userRepository.findByContactNo(details.getContactNo()) != null) {
            logger.info("user already exist with mobile number : {}", details.getContactNo());
            throw new BadRequestException(Constants.USER_EXIST);
        }
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        Date now = new Date();
        User user = new User();
        user.setEmail(details.getEmail());
        user.setName(details.getName());
        user.setContactNo(details.getContactNo());
        user = userRepository.save(user);


        Account account = new Account();
        account.setAccountNo(details.getContactNo());
        account.setBalance((long) 1000);
        accountRepository.save(account);
        return Constants.ACCOUNT_CREATED;
    }

    public Account getAccountFromToken(String token) {
        String contactNo = jwtTokenUtil.getUsernameFromToken(token);
        return accountRepository.findByAccountNo(contactNo);
    }

    public Account getAccountByAccountNo(String accountNo) {
        return accountRepository.findByAccountNo(accountNo);
    }

    public void updateAccount(Account account) {
        accountRepository.save(account);
    }

    public List<Account> getAccountList() {
        return accountRepository.findAll();
    }
}
