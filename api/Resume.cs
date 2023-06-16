namespace Resume;

public class Resume
{
  public string Pdf { get; set; }
  public string Profile { get; set; }
  public Icon[] Favourites { get; set; }
  public Icon[] Hobbies { get; set; }
  public Language[] Languages { get; set; }
  public string[] Competences { get; set; }
  public Skill[] ProgLanguages { get; set; }
  public Skill[] Frameworks { get; set; }
  public string[] Concepts { get; set; }
  public string[] Other { get; set; }
  public Icon[] Software { get; set; }
  public Job[] Jobs { get; set; }
}

public class Icon
{
  public string Name { get; set; }
  public string IconLink { get; set; }
}
public class Skill
{
  public Icon[] Skills { get; set; }
  public int Level { get; set; }
}
public class Language
{
  public string Name { get; set; }
  public string Level { get; set; }
  public string Certification { get; set; }
  public int Year { get; set; }
}
public class Job
{
  public int StartDate { get; set; }
  public int EndDate { get; set; }
  public int Duration { get; set; }
  public string Company { get; set; }
  public string Position { get; set; }
  public string[] Tasks { get; set; }
}
