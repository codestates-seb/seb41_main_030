package com.E1I5.mentaltal.user.counselor;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Counselor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long counselor_id; // BigInteger?

    @Column(nullable = false, updatable = false)
    private String user_name;

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
}
