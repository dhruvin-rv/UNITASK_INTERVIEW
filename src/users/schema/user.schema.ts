import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

/**
 * Represents a user in the application.
 */
@Schema({ timestamps: true })
export class User extends Document {
  /**
   * The email address of the user.
   * @example dhruvin@example.com
   */
  @Prop({ required: true, type: String })
  readonly email: string;

  /**
   * The name of the user.
   * @example Dhruvin Vaghasiya
   */
  @Prop({ required: true, type: String })
  readonly name: string;

  /**
   * The hashed password of the user.
   * @example $2fdga$10$0G5gOgh9kJq1WEFfdG86QRceg
   */
  @Prop({ required: true, type: String })
  readonly password: string;
  /**
   * User's loggedIn status.
   * @example true
   */
  @Prop({ required: true, type: Boolean, default: false })
  readonly loggedIn: boolean;
  /**
   * User's loggedIn encrypted jwt token.
   * @example eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjA4OTU4ZjczNDhmNDM2OWYxYzE5ZmUzOTViYTMzMDQwZTZhM2QzMWUzYzYxMzdmYjNmYzlhOGU4YTYwMTNkZTM3MjkzYWY1ZTMyNTcyNDFhMjNjNGRlMGEyMjYzM2FmYWQzZDM3NDE1YTMyMjM3NThlMWJkYjg3Nzk4NmQ2OTJkZjUxMzUzMDY3NWM3MDhjZjAxMWYyMjViMzM1NGU3ZjQ3NDQxZTIyMWE2YTIzYTU3ODViYTE3IiwiaWF0IjoxNjkzNjU4NDM1LCJleHAiOjE2OTM3MDE2MzV9.pVEqCNTZR4zvMN38xV5b9UkdsWzn8f92O_U6o48yyT0
   */
  @Prop({ required: true, type: String, default: false })
  readonly token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
