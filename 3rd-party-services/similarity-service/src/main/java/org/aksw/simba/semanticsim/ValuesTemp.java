/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.aksw.simba.semanticsim;

/**
 *
 * @author DiegoMoussallem
 */
public class ValuesTemp {
  private String entity;
  private String entity2;
  private double similarity; // Don't use double type for financial information.

  public String getEntity() { return entity; }

  public void setEntity(String entity) { this.entity = entity; }

  public String getEntity2() { return entity2; }

  public void setEntity2(String entity2) { this.entity2 = entity2; }

  public double getSimilarity() { return similarity; }

  public void setSimilarity(double similarity) { this.similarity = similarity; }
}
