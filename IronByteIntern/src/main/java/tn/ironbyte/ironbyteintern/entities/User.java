package tn.ironbyte.ironbyteintern.entities;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_user")
    private long id;
    private String name;
    private String email;
}
