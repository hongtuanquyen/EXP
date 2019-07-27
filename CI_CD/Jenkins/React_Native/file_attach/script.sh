ource ~/.bash_profile
#Job name
jobName="ReactJob"

#iOS scheme
scheme="remoconApp"

#initial config
cp ~/.jenkins/jobs/file_build/ExportOptions.plist ~/.jenkins/jobs/$jobName/workspace
cp ~/.jenkins/jobs/file_build/my-release-key.keystore ~/.jenkins/jobs/$jobName/workspace/remoconApp/android/app
cp ~/.jenkins/jobs/$jobName/workspace/remoconApp.xcodeproj/project.pbxproj ~/.jenkins/jobs/$jobName/workspace/remoconApp/ios/remoconApp.xcodeproj/project.pbxproj

#Install node_modules
cd ~/.jenkins/jobs/$jobName/workspace/remoconApp && npm install

#Build apk
cd ~/.jenkins/jobs/$jobName/workspace/remoconApp && npm run build-android-lixil && cp ~/.jenkins/jobs/$jobName/workspace/remoconApp/android/app/build/outputs/apk/lixil/release/app-lixil-release.apk ~/.jenkins/jobs/$jobName/workspace

#Build ipa
alias tracking-flastlane="xcodebuild -workspace remoconApp.xcworkspace \
            -scheme $scheme \
            -destination generic/platform=iOS build"

alias deploy-flastlane="xcodebuild -workspace remoconApp.xcworkspace -scheme $scheme -sdk iphoneos -configuration AppStoreDistribution archive -archivePath $PWD/build/remoconApp.xcarchive"

alias export-flastlane="xcodebuild -exportArchive -archivePath $PWD/build/remoconApp.xcarchive -exportOptionsPlist $PWD/../ExportOptions.plist -exportPath ~/.jenkins/jobs/$jobName/workspace"

cd ~/.jenkins/jobs/$jobName/workspace/remoconApp/ios && tracking-flastlane && deploy-flastlane && export-flastlane