import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';

export class FrontendSigninStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. Create the S3 Bucket
    const bucket = new s3.Bucket(this, 'FrontendBucket', {
      // Use the account and region dynamically
      bucketName: `signin-frontend-bucket-${this.account}-${this.region}`,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      
      // Public access settings
      publicReadAccess: true, 
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      }),
      
      removalPolicy: cdk.RemovalPolicy.DESTROY, // DeletionPolicy: Delete
      autoDeleteObjects: true, // This fixes your "Bucket not empty" error!
    });

    // Note: CDK automatically handles the Bucket Policy when you set 
    // publicReadAccess: true, so you don't need to write the IAM JSON manually!

    new cdk.CfnOutput(this, 'BucketName', {
      value: bucket.bucketName,
    });
    
    new cdk.CfnOutput(this, 'WebsiteURL', {
      value: bucket.bucketWebsiteUrl,
    });
  }
}