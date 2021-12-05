package com.belg.somechat.wscontrol;

import com.belg.somechat.db.MesData;
import com.belg.somechat.db.MesDataRepository;
import com.belg.somechat.msstr.MessageStructure;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
public class WebSocketController {

    @Autowired
    private MesDataRepository mesDataRepository;

    @MessageMapping("/user-all")
    @SendTo("/topic/user")
    public MesData sendToAll(@Payload MessageStructure message) {
        System.out.println(message.getMessage());
        MesData mes_to_db = new MesData(message.getName(), message.getMessage(), new Date());
        System.out.println(mesDataRepository.save(mes_to_db));
        return mes_to_db;
    }

    @MessageMapping("/history")
    @SendTo("/topic/user")
    public List<MesData> sendPreviousMessages(){
        List<MesData> messages = new ArrayList<MesData>();
        mesDataRepository.findAll().forEach(messages::add);
        System.out.println("JHEREREHRHERHERHEHREHRHERHHEHEREHEREHRERE");
        return messages;
    }
}
