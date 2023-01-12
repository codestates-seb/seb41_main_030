package com.E1I5.mentaltal.user.counselor;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Counselor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long counselorId;

    @Column(nullable = false, updatable = false)
    private String userName;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String education;

    @Column(nullable = false)
    private String career;

    @Column(nullable = false)
    private String center;

    private Boolean image;

//    public Counselor(String userName, String email, String password, String education, String career, String center, Boolean image) {
//        this.userName = userName;
//        this.email = email;
//        this.password = password;
//        this.education = education;
//        this.career = career;
//        this.center = center;
//        this.image = image;
//    }
}
